//imports ----------------------------------------------------------------------

import NodeInstance from '../../../lib/NodeInstance.js';


//exports ----------------------------------------------------------------------

export default function NewIconView(){

  //private code block ---------------------------------------------------------

  var icon = new NodeInstance('span');
  icon.className = 'icon fa';

  //public api -----------------------------------------------------------------

  return {
    rootNode: icon.rootNode,
    set isVisible(value){
      if (value === true){
        icon.setStyle('visibility', 'visible');
      } else {
        icon.setStyle('visibility', 'hidden');
      }
    },
    set char(value){
      if (value === 'arrow'){
        icon.updateClassList('type', 'fa-sort-desc');
      } else if (value === 'check'){
        icon.updateClassList('type', 'fa-check');
      }
    },
  }
}
