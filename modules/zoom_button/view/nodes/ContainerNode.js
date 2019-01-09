//imports ----------------------------------------------------------------------

import DomElement from '../../../../lib/DomElement.js';


//exports ----------------------------------------------------------------------

export default function ContainerNode( {containerClassName}, controlsState, emitter){

  //create dom element ---------------------------------------------------------

  var container = new DomElement('div', `zoom-button ${containerClassName}`);

  container.setEventListener('click', () => {
    emitter.onButtonClick();
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
