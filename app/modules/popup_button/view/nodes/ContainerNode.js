//imports ----------------------------------------------------------------------

import DomElement from '../../../../lib/DomElement.js';


//exports ----------------------------------------------------------------------

export default function ContainerNode(className, popupState, eventsEmitter){

  //create dom element ---------------------------------------------------------

  var container = new DomElement('div', className);

  container.setEventListener('click', () => {
    eventsEmitter.broadcast('click');
  });

  //define state change reactions ----------------------------------------------

  var updateListener = function(){
    if (popupState.isListening){
      container.enableListeners();
    } else {
      container.disableListeners();
    }
  }

  //load reactions -------------------------------------------------------------

  popupState.addListener('isListening', 'menuContainer - listener', updateListener);

  //init dom element -----------------------------------------------------------

  updateListener();

  //public api -----------------------------------------------------------------

  return container;

}
