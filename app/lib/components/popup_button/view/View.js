//imports ----------------------------------------------------------------------

import RootNode from './nodes/RootNode.js';
import IconNode from './nodes/IconNode.js';


//exports ----------------------------------------------------------------------

export default function PopupButtonView(rootClassName, iconClassName, buttonId){

  //public api -----------------------------------------------------------------

  this.nodes = {
    root: new RootNode(rootClassName, buttonId),
    icon: new IconNode(iconClassName),
  }

}
