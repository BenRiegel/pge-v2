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

  container.node.appendChild(iconContainer.node);
  container.node.appendChild(labelContainer.node);
  iconContainer.node.appendChild(icon.node);
  labelContainer.node.appendChild(labelName.node);
  labelContainer.node.appendChild(labelCount.node);

  //public api -----------------------------------------------------------------

  this.rootNode = container.node;

  this.hasRendered = new Promise(resolve => {
    container.render();
    iconContainer.render();
    icon.render();
    labelContainer.render();
    resolve();
  });

}
