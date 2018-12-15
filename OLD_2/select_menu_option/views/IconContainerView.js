//imports ----------------------------------------------------------------------

import NodeInstance from '../../../lib/NodeInstance.js';


//exports ----------------------------------------------------------------------

export default function NewIconContainerView(){

  //private code block ---------------------------------------------------------

  var container = new NodeInstance('div');
  container.className = 'icon-container';

  //public api -----------------------------------------------------------------

  return {
    rootNode: container.rootNode,
    set hasBorder(value){
      if (value === true){
        container.updateClassList('border', 'border');
      } else {
        container.updateClassList('border', null);
      }
    },
  }
}
