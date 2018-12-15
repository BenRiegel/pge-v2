//imports ----------------------------------------------------------------------

import NodeInstance from '../../../lib/NodeInstance.js';
import { addChildrenTo } from '../../../lib/ViewUtils.js';


//exports ----------------------------------------------------------------------

export default function NewSelectMenuOptionLabel( {name, count} ){

  //private code block ---------------------------------------------------------

  var tagName = new NodeInstance('div');
  tagName.className = 'tag-name';
  tagName.innerHTML = name;
  var tagCount = new NodeInstance('div');
  tagCount.className = 'tag-count';
  tagCount.innerHTML = count;
  var container = new NodeInstance('div');
  container.className = 'label';
  addChildrenTo(container, [tagName, tagCount]);

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


/*
renderIndent: function(isIndented){
  var className = isIndented ? 'indent-left' : 'indent-right';
  container.updateClassList('indent', className);
},


   indent: function(){
      container.updateClassList('indent', 'indent-left');
    },
    removeIndent: function(){
      container.updateClassList('indent', 'indent-right');
    },*/
