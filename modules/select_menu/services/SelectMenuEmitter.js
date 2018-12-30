//imports ----------------------------------------------------------------------

import NewEmitter from '../../../lib/Emitter.js';


//exports ----------------------------------------------------------------------

export default function SelectMenuEmitter(state){

  //creat emitter --------------------------------------------------------------

  var emitter = NewEmitter();

  //helper variable ------------------------------------------------------------

  var eventMessages = [];

  //define helper functions ----------------------------------------------------

  var broadcastEventMessages = function(){
    while (eventMessages.length > 0){
      var message = eventMessages.pop();
      emitter.broadcast(message.eventName, message.payload);
    }
  }

  var addNewEventMessage = function(eventName, payload){
    eventMessages.unshift( {eventName, payload} );
  }

  //define state change reactions ----------------------------------------------

  var broadcast = function(eventInProgress){
    if (eventInProgress){
      emitter.broadcast('eventInProgress');
    } else {
      emitter.broadcast('eventFinished');
      broadcastEventMessages();
    }
  }

  var addEventMessage = function(newSelectedOption){
    if (state.eventInProgress){
      addNewEventMessage('newSelectedOption', newSelectedOption);
    }
  }

  //load reactions -------------------------------------------------------------

  state.addListener('eventInProgress', 'emitter', 'broadcast', broadcast);
  state.addListener('selectedOptionKey', 'emitter', 'addEventMessage', addEventMessage);

  //public api -----------------------------------------------------------------

  return emitter;

}
