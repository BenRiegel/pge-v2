//imports ----------------------------------------------------------------------

import DomElement from '../../../../lib/DomElement.js';


//exports ----------------------------------------------------------------------

export default function IconNode(menuState, optionState){

  //create dom element ---------------------------------------------------------

  var icon = new DomElement('span', 'icon fa');

  icon.displayArrow = function(){
    this.removeClass('fa-check');
    this.addClass('fa-sort-desc');
  };

  icon.displayCheck = function(){
    this.removeClass('fa-sort-desc');
    this.addClass('fa-check');
  };

  //define state change reactions ----------------------------------------------

  var updateVisibility = function(){
    if (optionState.isSelected){
      icon.show();
    } else {
      icon.hide();
    }
  };

  var updateChar = function(){
    if (menuState.isOpen){
      icon.displayCheck();
      } else {
      icon.displayArrow();
    }
  };

  //load reactions -------------------------------------------------------------

  menuState.addListener('isOpen', 'optionIcon', 'iconChar', updateChar);
  optionState.addListener('isSelected', 'optionIcon', 'visibility', updateVisibility);

  //public api -----------------------------------------------------------------

  this.node = icon.node;

  this.render = function(){
    updateVisibility();
    updateChar();
  };

}
