export default function PopupEmitterController(emitter, state){

  //define reactions -----------------------------------------------------------

  var broadcastIsOpenChange = function(){
    if (state.isOpen){
      emitter.broadcast('isOpen');
    } else {
      emitter.broadcast('isClosed');
    }
  }

  var broadcastEventInProgress = function(eventInProgress){
    if (eventInProgress){
      emitter.broadcast('eventStart');
    } else {
      emitter.broadcast('eventEnd');
    }
  }

  //load reactions -------------------------------------------------------------

  state.addListenerByType('isOpen', 'emitter', broadcastIsOpenChange);
  state.addListenerByType('isExpanded', 'emitter', broadcastEventInProgress);

}
