//imports ----------------------------------------------------------------------

import { addChildrenTo } from '../../../lib/ViewUtils.js';


//exports ----------------------------------------------------------------------

export default function NewDomController(view){
  addChildrenTo(view.container.node, [view.body.node, view.arrow.node]);
  addChildrenTo(view.body.node, [view.loader.rootNode, view.contentContainer.node]);
  addChildrenTo(view.contentContainer.node, [view.closeButton.rootNode,
                                             view.title.node,
                                             view.author.node,
                                             view.image.node,
                                             view.text.node,
                                             view.readMoreText.node]);
}
