//imports ----------------------------------------------------------------------

import RootNode from './nodes/RootNode.js';
import IconContainerNode from './nodes/IconContainerNode.js';
import IconNode from './nodes/IconNode.js';
import LabelContainerNode from './nodes/LabelContainerNode.js';
import LabelNameNode from './nodes/LabelNameNode.js';
import LabelCountNode from './nodes/LabelCountNode.js';


//exports ----------------------------------------------------------------------

export default function SelectMenuOptionView(config){

  //public api -----------------------------------------------------------------

  this.nodes = {
    root: new RootNode(config.key),
    iconContainer: new IconContainerNode(),
    icon: new IconNode(),
    labelContainer: new LabelContainerNode(),
    labelName: new LabelNameNode(config.label.name),
    labelCount: new LabelCountNode(config.label.count),
  }

}
