//imports ----------------------------------------------------------------------

import ContainerNode from './nodes/ContainerNode.js';
import IconContainerNode from './nodes/IconContainerNode.js';
import IconNode from './nodes/IconNode.js';
import LabelContainerNode from './nodes/LabelContainerNode.js';
import LabelNameNode from './nodes/LabelNameNode.js';
import LabelCountNode from './nodes/LabelCountNode.js';


//exports ----------------------------------------------------------------------

export default function OptionView(optionProps){

  //create nodes ---------------------------------------------------------------

  var nodes = {
    container: new ContainerNode(optionProps.key),
    iconContainer: new IconContainerNode(),
    icon: new IconNode(),
    labelContainer: new LabelContainerNode(),
    labelName: new LabelNameNode(optionProps.name),
    labelCount: new LabelCountNode(optionProps.count),
  }

  //public api -----------------------------------------------------------------

  this.rootNode = nodes.container.node;

  this.nodes = nodes;

}
