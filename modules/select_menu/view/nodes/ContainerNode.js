//imports ----------------------------------------------------------------------

import DomElement from '../../../../lib/DomElement.js';
import { getParentNodeProperty } from '../../../../lib/ViewUtils.js';


//exports ----------------------------------------------------------------------

export default function ContainerNode(state){

  //create dom element ---------------------------------------------------------

  var container = new DomElement('div', 'select-menu-container');

  container.setRoundedBorderRadius = function(){
    this.addClass('rounded');
  };

  container.setDefaultBorderRadius = function(){
    this.removeClass('rounded');
  };

  //define event handler -------------------------------------------------------

  var clickEventHandler = async function(evt){
    var optionClicked = getParentNodeProperty(evt.target, 'option', 'key');
    state.updateOnOptionClick(optionClicked);
  }

  //define state change reactions ----------------------------------------------

  var updateBorderRadius = function(){
    if (state.isOpen){
      container.setDefaultBorderRadius();
    } else {
      container.setRoundedBorderRadius();
    }
  };

  var updateListener = function(){
    if (state.isEnabled && !state.isTransitioning){
      container.addEventListener('click', clickEventHandler);
    } else {
      container.removeEventListener('click', clickEventHandler);
    }
  }

  //load reactions -------------------------------------------------------------

  state.addListener('isOpen', 'menuContainer', 'borderRadius', updateBorderRadius);
  state.addListener('isEnabled', 'menuContainer', 'listener', updateListener);
  state.addListener('isTransitioning', 'menuContainer', 'listener', updateListener);

  //public api -----------------------------------------------------------------

  this.node = container.node;

  this.render = function(){
    updateBorderRadius();
    updateListener();
  };

};
