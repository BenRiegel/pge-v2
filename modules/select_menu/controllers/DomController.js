//imports ----------------------------------------------------------------------

import { addChildrenTo } from '../../../lib/ViewUtils.js';


//exports ----------------------------------------------------------------------

export default function NewDomController(container){

  //public api -----------------------------------------------------------------

  return {
    addOption: function(option){
      option.iconContainer.node.appendChild(option.icon.node);
      addChildrenTo(option.labelContainer.node, [option.labelName.node,
                                                 option.labelCount.node]);
      addChildrenTo(option.container.node, [option.iconContainer.node,
                                            option.labelContainer.node]);
      container.node.appendChild(option.container.node);
    },
  }

}
