//imports ----------------------------------------------------------------------

import projects from '../../../data/Projects.js';
import State from '../../../state/State.js';
import NodeInstance from '../lib/NodeInstance.js';
import { addChildrenTo, doForAll } from '../lib/ViewUtils.js';
import Graphic from './Graphic.js';
import '../../stylesheets/graphics_layer.scss';


//exports ----------------------------------------------------------------------

export default function NewGraphicsLayer(){

  //state ----------------------------------------------------------------------

  var state = new State('selectedTag');

  //view -----------------------------------------------------------------------

  var clickEventHandler = function(evt){
    /*switch(evt.target.dataset.type){
      case 'point':
        onPointSelect(evt.target.dataset.id, evt.target.dataset.worldX, evt.target.dataset.worldY);
        break;
      case 'cluster':
        onClusterSelect(evt.target.dataset.worldX, evt.target.dataset.worldY);
        break;
      default:
        break;
    }*/
  }

  var container = new NodeInstance('div');
  container.className = 'graphics-layer';
  container.onClick = clickEventHandler;
  var graphics = [];
  for (var project of projects){
    var graphic = new Graphic(project);
    graphics.push(graphic);
  }
  addChildrenTo(container, graphics);

  //controller -----------------------------------------------------------------

  state.selectedTag.onChange = async function(currentValue, previousValue){
    doForAll(graphics, 'updateIsFiltered', currentValue);
  };

  //public api -----------------------------------------------------------------

  return {
    rootNode: container.rootNode,
    setSelectedTag: function(newValue){
      state.selectedTag.set(newValue);
    },
    enable: function(){
      container.onClick = clickEventHandler;
    },
    disable: function(){
      container.onClick = null;
    },
    renderGraphics: function(){

    }
  }

}
