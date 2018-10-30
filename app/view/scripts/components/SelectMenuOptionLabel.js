//imports ----------------------------------------------------------------------

import NodeInstance from '../lib/NodeInstance.js';
import { addChildrenTo } from '../lib/ViewUtils.js';
import '../../stylesheets/select_menu_option_label.scss';


//exports ----------------------------------------------------------------------

export default function NewSelectMenuOptionLabel(name, count, type){

  //view -----------------------------------------------------------------------

  var tagName = new NodeInstance('div');
  tagName.className = 'tag-name';
  tagName.innerHTML = name;
  var tagCount = new NodeInstance('div');
  tagCount.className = 'tag-count';
  tagCount.innerHTML = count;
  var container = new NodeInstance('div');
  container.className = 'label';
  addChildrenTo(container, [tagName, tagCount]);

  var updateIndentStyle = function(isOpen){
    container.updateClassList('indent', isOpen ? 'indent-left' : 'indent-right');
  }

  //public api -----------------------------------------------------------------

  return {
    rootNode: container.rootNode,
    onIsOpenChange: function(isOpen){
      if (type === 'secondary'){
        updateIndentStyle(isOpen);
      }
    },
  }

}
