//imports ----------------------------------------------------------------------

import { getDimensions } from '../../../lib/ViewUtils.js';


//exports ----------------------------------------------------------------------

export default function NewContainerView(){

  //private code block ---------------------------------------------------------

  var node = document.createElement('div');
  node.className = 'popup-container';

  //public api -----------------------------------------------------------------

  return {
    node,
    getDimensions: function(){
      return getDimensions(node);
    }
  };
}
