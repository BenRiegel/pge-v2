//imports ----------------------------------------------------------------------

import ZoomButton from '../../zoom_button/ZoomButton.js';
import ContainerNode from './nodes/ContainerNode.js';
import ButtonContainerNode from './nodes/ButtonContainerNode.js';


//exports ----------------------------------------------------------------------

export default function ZoomControlsView(state){

  //create nodes ---------------------------------------------------------------

  var container = new ContainerNode();
  var homeButtonContainer = new ButtonContainerNode();
  var inOutButtonContainer = new ButtonContainerNode();

  //create subcomponents -------------------------------------------------------

  var buttons = {
    home: new ZoomButton('zoom-home', 'fa-home', state),
    in: new ZoomButton('zoom-in', 'fa-plus', state),
    out: new ZoomButton('zoom-out', 'fa-minus', state),
  }

  //configure dom --------------------------------------------------------------

  container.node.appendChild(homeButtonContainer.node);
  container.node.appendChild(inOutButtonContainer.node);
  homeButtonContainer.node.appendChild(buttons.home.rootNode);
  inOutButtonContainer.node.appendChild(buttons.in.rootNode);
  inOutButtonContainer.node.appendChild(buttons.out.rootNode);

  //public api -----------------------------------------------------------------

  this.rootNode = container.node;

  this.addClickListener = function(buttonName, cb){
    buttons[buttonName].addClickListener(cb);
  }

}
