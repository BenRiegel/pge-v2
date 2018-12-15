//imports ----------------------------------------------------------------------

import { getParentNodeProperty } from '../lib/ViewUtils.js';
import NodeInstance from '../lib/NodeInstance.js';
import '../../stylesheets/select_menu.scss';


//exports ----------------------------------------------------------------------

export default function NewSelectMenuContainer(clickAction){

  //view -----------------------------------------------------------------------

  var clickEventHandler = function(evt){
    var optionClicked = getParentNodeProperty(evt.target, 'option', 'key');
    clickAction(optionClicked);
  }

  var container = new NodeInstance('div');
  container.className = 'select-menu-container';

  //public api -----------------------------------------------------------------

  return {
    rootNode: container.rootNode,
    enableListener: function(){
      container.onClick = clickEventHandler;
    },
    disableListener: function(){
      container.onClick = null;
    },
    onIsOpenChange: function(isOpen){
      container.updateClassList('borderRadius', isOpen ? 'open' : '');
    },
  };
}
