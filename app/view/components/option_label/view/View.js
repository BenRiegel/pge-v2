//imports ----------------------------------------------------------------------

import RootNode from './nodes/RootNode.js';
import NameNode from './nodes/NameNode.js';
import CountNode from './nodes/CountNode.js';


//exports ----------------------------------------------------------------------

export default function SelectMenuOptionView(props){

  //public api -----------------------------------------------------------------

  this.nodes = {
    root: new RootNode(),
    name: new NameNode(props.name, props.isIndented),
    count: new CountNode(props.count),
  };

}
