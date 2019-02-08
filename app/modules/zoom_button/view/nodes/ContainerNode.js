//imports ----------------------------------------------------------------------

import DomElement from '../../../../lib/DomElement.js';
import '../stylesheets/zoom_button_container.scss';


//exports ----------------------------------------------------------------------

export default function ContainerNode(className, controlsState, eventsEmitter){

  //create dom element ---------------------------------------------------------

  var container = new DomElement('div', `zoom-button ${className}`);

  container.setEventListener('click', () => {
    eventsEmitter.broadcast('click');
  });

  //define state change reactions ----------------------------------------------

  var updateListeners = function(){
    if (controlsState.isEnabled){
      container.enableListeners();
    } else {
      container.disableListeners();
    }
  }

  //load reactions -------------------------------------------------------------

  controlsState.addListener('isEnabled', 'zoomInButton', 'isListening', updateListeners);

  //public api -----------------------------------------------------------------

  this.node = container.node;

  this.render = function(){
    updateListeners();
  }

}
