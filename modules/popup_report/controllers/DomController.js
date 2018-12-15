//imports ----------------------------------------------------------------------

import { addChildrenTo } from '../../../lib/ViewUtils.js';


//exports ----------------------------------------------------------------------

export default function NewDomController(view){

  addChildrenTo(view.container.node, [view.loader.rootNode,
                                      view.contentContainer.node]);
  addChildrenTo(view.contentContainer.node, [view.closeButton.rootNode,
                                             view.contractButton.rootNode,
                                             view.iframe.node]);
}
