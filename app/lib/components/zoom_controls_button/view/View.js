//imports ----------------------------------------------------------------------

import RootNode from './nodes/RootNode.js';
import IconNode from './nodes/IconNode.js';


//exports ----------------------------------------------------------------------

export default function ZoomControlsButtonView(rootClassName, iconClassName){

  //public api -----------------------------------------------------------------

  this.nodes = {
    root: new RootNode(rootClassName),
    icon: new IconNode(iconClassName),
  };

}
