//imports ----------------------------------------------------------------------

import ContainerNode from './nodes/ContainerNode.js';
import IconContainerNode from './nodes/IconContainerNode.js';
import IconNode from './nodes/IconNode.js';
import LabelContainerNode from './nodes/LabelContainerNode.js';
import LabelNameNode from './nodes/LabelNameNode.js';
import LabelCountNode from './nodes/LabelCountNode.js';


//exports ----------------------------------------------------------------------

export default function OptionView(menuState, optionState, optionProps){

  //create nodes ---------------------------------------------------------------

  var container = new ContainerNode(menuState, optionState, optionProps.key)
  var iconContainer = new IconContainerNode(menuState);
  var icon = new IconNode(menuState, optionState);
  var labelContainer = new LabelContainerNode(menuState, optionProps.labelIsIndented);
  var labelName = new LabelNameNode(optionProps.name);
  var labelCount = new LabelCountNode(optionProps.count);

  //configure dom --------------------------------------------------------------

  container.appendChildNode(iconContainer.node);
  container.appendChildNode(labelContainer.node);
  iconContainer.appendChildNode(icon.node);
  labelContainer.appendChildNode(labelName.node);
  labelContainer.appendChildNode(labelCount.node);

  //public api -----------------------------------------------------------------

  this.rootNode = container.node;

}
