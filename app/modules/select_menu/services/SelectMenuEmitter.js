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
      console.log(message);
      emitter.broadcast(message.eventName, message.payload);
    }
  }

  var addNewEventMessage = function(eventName, payload){
    eventMessages.unshift( {eventName, payload} );
  }

  //define state change reactions ----------------------------------------------

  var broadcast = function(){
    if (state.eventInProgress){
      emitter.broadcast('eventStart');
    } else {
      emitter.broadcast('eventEnd');
      broadcastEventMessages();
    }
  }

  //this is stupid
  var addEventMessage = function(){
    if (state.eventInProgress){
      addNewEventMessage('newSelectedOption', state.selectedOptionKey);
    }
  }

  //load reactions -------------------------------------------------------------

  state.addListener('eventInProgress', 'emitter - broadcast', broadcast);
  state.addListener('selectedOptionKey', 'emitter - addEventMessage', addEventMessage);

  //public api -----------------------------------------------------------------

  return emitter;

}
