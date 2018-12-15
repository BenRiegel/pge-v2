//imports ----------------------------------------------------------------------

import NodeInstance from '../../../lib/NodeInstance.js';


//exports ----------------------------------------------------------------------

export default function NewLabelNameView(name){

  //private code block ---------------------------------------------------------

  var tagName = new NodeInstance('div');
  tagName.className = 'tag-name';
  tagName.innerHTML = name;

  //public api -----------------------------------------------------------------

  return {
    rootNode: tagName.rootNode,
  }
}
