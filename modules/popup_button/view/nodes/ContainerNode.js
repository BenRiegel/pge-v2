//imports ----------------------------------------------------------------------

import DomElement from '../../../../lib/DomElement.js';


//exports ----------------------------------------------------------------------

export default function ContainerNode( {containerClassName, onButtonClick, popupState} ){

  //create dom element ---------------------------------------------------------

  var container = new DomElement('div', containerClassName);

  container.setEventListener('click', onButtonClick);

  //define state change reactions ----------------------------------------------

  var updateListener = function(){
    if (popupState.isEnabled  && !popupState.eventInProgress){
      container.enableListeners();
    } else {
      container.disableListeners();
    }
  }

  //load reactions -------------------------------------------------------------

  popupState.addListener('isEnabled', 'menuContainer', 'listener', updateListener);
  popupState.addListener('eventInProgress', 'menuContainer', 'listener', updateListener);

  //public api -----------------------------------------------------------------

  this.node = container.node;

  this.render = function(){
    updateListener();
  }

}
