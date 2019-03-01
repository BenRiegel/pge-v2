//imports ----------------------------------------------------------------------

import ScreenCoordsProp from '../props/ScreenCoordsProp.js';
import '../stylesheets/graphic_container.scss';


//exports ----------------------------------------------------------------------

export default function GraphicContainerNode(props){

  //create dom element ---------------------------------------------------------

  var node = document.createElement('div');
  node.className = 'graphic-container';
  node.dataset.id = props.id;
  node.dataset.x = props.worldCoords.x;
  node.dataset.y = props.worldCoords.y;
  node.dataset.type = props.type;
  node.innerHTML = props.numLocations;

  var props = {
    screenCoords: new ScreenCoordsProp(node),
  }

  //public api -----------------------------------------------------------------

  return { node, props };

}
