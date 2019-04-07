//imports ----------------------------------------------------------------------

import RootNode from './nodes/RootNode.js';
import IconNode from './nodes/IconNode.js';


//exports ----------------------------------------------------------------------

export default function SelectMenuOptionView(props){

  //public api -----------------------------------------------------------------

  this.nodes = {
    root: new RootNode(props.key),
    icon: new IconNode(),
  };

}
