//imports ----------------------------------------------------------------------

import DomElement from '../../../../lib/DomElement.js';


//exports ----------------------------------------------------------------------

export default function NewLabelContainer(menuState, isIndented){

  //create dom element ---------------------------------------------------------

  var labelContainer = new DomElement('div', 'label');

  labelContainer.showIndent = function(){
    this.removeClass('indent-right');
    this.addClass('indent-left');
  };

  labelContainer.hideIndent = function(){
    this.removeClass('indent-left');
    this.addClass('indent-right');
  };

  //define state change reactions ----------------------------------------------

  var updateIndent = function(){
    if (isIndented){
      if (menuState.isOpen){
        labelContainer.showIndent();
      } else {
        labelContainer.hideIndent();
      }
    }
  };

  //load reactions -------------------------------------------------------------

  menuState.addListener('isOpen', 'optionLabelContainer', 'indent', updateIndent);

  //public api -----------------------------------------------------------------

  this.node = labelContainer.node;

  this.render = function(){
    updateIndent();
  }

}
