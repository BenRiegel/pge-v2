//imports ----------------------------------------------------------------------

import Option from '../../select_menu_option/SelectMenuOption.js';
import ContainerNode from './nodes/ContainerNode.js';


//exports ----------------------------------------------------------------------

export default function SelectMenuView(state){

  //create nodes ---------------------------------------------------------------

  var container = new ContainerNode(state);

  //public api -----------------------------------------------------------------

  this.rootNode = container.node;

  this.addNewOption = function(optionProps){
    var option = new Option(optionProps, state);
    container.appendChildNode(option.rootNode);
  }

}
