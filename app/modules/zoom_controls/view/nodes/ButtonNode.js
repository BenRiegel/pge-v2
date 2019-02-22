//imports ----------------------------------------------------------------------

import DomElement from '../../../../lib/DomElement.js';
import '../stylesheets/zoom_button_container.scss';


//exports ----------------------------------------------------------------------

export default function ButtonNode(className, broadcastMessage, controlsState, eventsEmitter){

  //create dom element ---------------------------------------------------------

  var button = new DomElement('div', `zoom-button ${className}`);

  button.setEventListener('click', () => {
    eventsEmitter.broadcast(broadcastMessage);
  });

  //define state change reactions ----------------------------------------------

  var updateListeners = function(){
    if (controlsState.isEnabled){
      button.enableListeners();
    } else {
      button.disableListeners();
    }
  }

  //load reactions -------------------------------------------------------------

  controlsState.addListener('isEnabled', 'zoomInButton', 'isListening', updateListeners);

  //init dom element -----------------------------------------------------------

  updateListeners();

  //public api -----------------------------------------------------------------

  this.node = button.node;

}
