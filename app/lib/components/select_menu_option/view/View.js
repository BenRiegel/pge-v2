//imports ----------------------------------------------------------------------

import RootNode from './nodes/RootNode.js';
import IconContainerNode from './nodes/IconContainerNode.js';
import IconNode from './nodes/IconNode.js';
import LabelContainerNode from './nodes/LabelContainerNode.js';
import LabelNameNode from './nodes/LabelNameNode.js';
import LabelCountNode from './nodes/LabelCountNode.js';


//exports ----------------------------------------------------------------------

export default function SelectMenuOptionView(optionProps){

  //public api -----------------------------------------------------------------

  this.nodes = {
    root: new RootNode(optionProps.key),
    iconContainer: new IconContainerNode(),
    icon: new IconNode(),
    labelContainer: new LabelContainerNode(),
    labelName: new LabelNameNode(optionProps.name),
    labelCount: new LabelCountNode(optionProps.count),
  }

}
