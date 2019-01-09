//imports ----------------------------------------------------------------------

import ZoomButton from '../../zoom_button/ZoomButton.js';
import ContainerNode from './nodes/ContainerNode.js';
import ButtonContainerNode from './nodes/ButtonContainerNode.js';


//exports ----------------------------------------------------------------------

export default function ZoomControlsView(state){

  //create nodes ---------------------------------------------------------------

  var container = new ContainerNode();
  var zoomButtonContainer = new ButtonContainerNode();
  var zoomHomeButton = new ZoomButton({containerClassName:'zoom-home', iconClassName:'fa-home'}, state);
  var zoomInOutButtonContainer = new ButtonContainerNode();
  var zoomInButton = new ZoomButton({containerClassName:'zoom-in', iconClassName:'fa-plus'}, state);
  var zoomOutButton = new ZoomButton({containerClassName:'zoom-out', iconClassName:'fa-minus'}, state);

  //configure dom --------------------------------------------------------------

  container.node.appendChild(zoomButtonContainer.node);
  container.node.appendChild(zoomInOutButtonContainer.node);
  zoomButtonContainer.node.appendChild(zoomHomeButton.rootNode);
  zoomInOutButtonContainer.node.appendChild(zoomInButton.rootNode);
  zoomInOutButtonContainer.node.appendChild(zoomOutButton.rootNode);

  //public api -----------------------------------------------------------------

  this.rootNode = container.node;

  this.addClickListener = function(buttonName, cb){
    switch (buttonName){
      case 'home':
        zoomHomeButton.addListener('click', cb);
        break;
      case 'in':
        zoomInButton.addListener('click', cb);
        break;
      case 'out':
        zoomOutButton.addListener('click', cb);
        break;
      default:
        break;
    }
  }

}
