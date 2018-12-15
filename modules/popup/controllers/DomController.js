//imports ----------------------------------------------------------------------

import { addChildrenTo } from '../../../lib/ViewUtils.js';


//exports ----------------------------------------------------------------------

export default function NewDomController(view){

  addChildrenTo(view.container.node, [view.summary.rootNode, view.report.rootNode]);
}
