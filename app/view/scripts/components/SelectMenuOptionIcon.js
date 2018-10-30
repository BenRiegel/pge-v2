//imports ----------------------------------------------------------------------

import NodeInstance from '../lib/NodeInstance.js';
import { addChildrenTo } from '../lib/ViewUtils.js';
import '../../stylesheets/select_menu_option_icon.scss';


//exports ----------------------------------------------------------------------

export default function NewSelectMenuOptionIcon(){

  //view -----------------------------------------------------------------------

  var icon = new NodeInstance('span');
  icon.className = 'icon fa';
  var container = new NodeInstance('div');
  container.className = 'icon-container';
  addChildrenTo(container, [icon]);

  var updateIconVisibility = function(isSelected){
    icon.setStyle('visibility', isSelected ? 'visible' : 'hidden');
  };

  var updateIcon = function(isOpen){
    icon.updateClassList('type', isOpen ? 'fa-check' : 'fa-sort-desc');
  };

  var updateBorder = function(isOpen){
    container.updateClassList('border', isOpen ? '' : 'border');
  }

  //public api -----------------------------------------------------------------

  return {
    rootNode: container.rootNode,
    onIsSelectedChange: function(isSelected){
      updateIconVisibility(isSelected);
    },
    onIsOpenChange: function(isOpen){
      updateIcon(isOpen);
      updateBorder(isOpen);
    },
  }

}
