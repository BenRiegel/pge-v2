//imports ----------------------------------------------------------------------

import State from './state/State.js';
import View from './view/View.js';
import ViewController from './controllers/ViewController.js';


//exports ----------------------------------------------------------------------

export default function ClusterGraphic(props, layerState, webMapState){

  //private code block ---------------------------------------------------------

  var state = new State();
  var view = new View(props);
  var controller = {
    view: new ViewController(view, props, state, webMapState),
  };

  //public api -----------------------------------------------------------------

  this.rootNode = view.nodes.root.node;

  this.worldCoords = props.worldCoords;

  this.removeListeners = function(){
    controller.view.removeListeners();
  };

  this.updateIsSelected = function(graphicId){
    state.set('isSelected', graphicId === props.id);
  };

}
