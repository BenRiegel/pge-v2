//imports ----------------------------------------------------------------------

import { addChildrenTo } from '../../../lib/ViewUtils.js';


//exports ----------------------------------------------------------------------

export default function NewDomController(view){
  addChildrenTo(view.iconContainer, [view.icon]);
  addChildrenTo(view.labelContainer, [view.labelName, view.labelCount]);
  addChildrenTo(view.container, [view.iconContainer, view.labelContainer]);
}
