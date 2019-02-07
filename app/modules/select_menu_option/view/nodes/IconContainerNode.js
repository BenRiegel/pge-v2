//imports ----------------------------------------------------------------------

import DomElement from '../../../../lib/DomElement.js';


//exports ----------------------------------------------------------------------

export default function IconContainerNode(menuState){

  //create dom element ---------------------------------------------------------

  var iconContainer = new DomElement('div', 'icon-container');

  iconContainer.showBorder = function(){
    this.addClass('border');
  };

  iconContainer.hideBorder = function(){
    this.removeClass('border');
  };

  //define state change reactions ----------------------------------------------

  var updateBorderVisibility = function(){
    if (menuState.isOpen){
      iconContainer.hideBorder();
    } else {
      iconContainer.showBorder();
    }
  };

  //load reactions -------------------------------------------------------------

  menuState.addListener('isOpen', 'optionIconContainer', 'borderVisibility', updateBorderVisibility);

  //public api -----------------------------------------------------------------

  this.node = iconContainer.node;

  this.render = function(){
    updateBorderVisibility();
  }

}
