//imports ----------------------------------------------------------------------

import NodeInstance from '../../../lib/NodeInstance.js';


//exports ----------------------------------------------------------------------

export default function NewLabelCountView(count){

  //private code block ---------------------------------------------------------

  var tagCount = new NodeInstance('div');
  tagCount.className = 'tag-count';
  tagCount.innerHTML = count;

  //public api -----------------------------------------------------------------

  return {
    rootNode: tagCount.rootNode,
  }
}
