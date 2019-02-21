//imports ----------------------------------------------------------------------

import NewEmitter from '../../../lib/Emitter.js';


//exports ----------------------------------------------------------------------

export default function PopupEmitter(state){

  //creat emitter --------------------------------------------------------------

  var emitter = NewEmitter();

  //define state change reactions ----------------------------------------------

  var broadcast = function(){
    if (state.eventInProgress){
      emitter.broadcast('eventStart');
    } else {
      emitter.broadcast('eventEnd');
    };
  }

  var broadcastOnClose = function(){
    emitter.broadcast('isClosed');
  }

  //load reactions -------------------------------------------------------------

  state.addListener('eventInProgress', 'emitter', 'broadcast', broadcast);

  state.addListener('isOpen', 'emitter', 'broadcast', () => {
    if (!state.isOpen){
      broadcastOnClose();
    }
  });

  //public api -----------------------------------------------------------------

  return emitter;

}
