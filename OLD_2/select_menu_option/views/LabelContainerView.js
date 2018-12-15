//imports ----------------------------------------------------------------------

import NodeInstance from '../../../lib/NodeInstance.js';


//exports ----------------------------------------------------------------------

export default function NewLabelContainerView(){

  //private code block ---------------------------------------------------------

  var container = new NodeInstance('div');
  container.className = 'label';

  //public api -----------------------------------------------------------------

  return {
    rootNode: container.rootNode,
    set indentIsActive(value){
      if (value === true){
        container.updateClassList('indent', 'indent-left');
      } else {
        container.updateClassList('indent', 'indent-right');
      }
    },
  }
}
