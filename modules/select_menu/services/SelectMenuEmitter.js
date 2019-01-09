//imports ----------------------------------------------------------------------

import Emitter from '../../../lib/Emitter.js';


//exports ----------------------------------------------------------------------

export default function SelectMenuEmitter(state){

  //create emitter -------------------------------------------------------------

  var emitter = new Emitter();

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
      emitter.broadcast('eventStart');
    } else {
      emitter.broadcast('eventEnd');
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
