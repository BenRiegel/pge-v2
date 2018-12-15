//imports ----------------------------------------------------------------------

import NodeInstance from '../../../lib/NodeInstance.js';
import { addChildrenTo } from '../../../lib/ViewUtils.js';


//exports ----------------------------------------------------------------------

export default function NewSelectMenuOptionIcon(){

  //private code block ---------------------------------------------------------

  var icon = new NodeInstance('span');
  icon.className = 'icon fa';
  var container = new NodeInstance('div');
  container.className = 'icon-container';
  addChildrenTo(container, [icon]);

  //public api -----------------------------------------------------------------

  return {
    rootNode: container.rootNode,
    renderVisibility: function(value){
      icon.setStyle('visibility', value);
    },
    renderIconType: function(type){
      var className = (type === 'arrow') ? 'fa-sort-desc' : 'fa-check';
      icon.updateClassList('type', className);
    },
    renderBorder: function(isShowing){
      var className = (isShowing) ? 'border' : null;
      container.updateClassList('border', className);
    },

    /*show: function(){
      icon.setStyle('visibility', 'visible');
    },
    hide: function(){
      icon.setStyle('visibility', 'hidden');
    },
    displayArrow: function(){
      icon.updateClassList('type', 'fa-sort-desc');
    },
    displayCheck: function(){
      icon.updateClassList('type', 'fa-check');
    },
    showBorder: function(){
      container.updateClassList('border', 'border');
    },
    hideBorder: function(){
      container.updateClassList('border', null);
    },*/
  }
}
