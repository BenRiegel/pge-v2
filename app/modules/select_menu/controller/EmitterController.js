export default function EmitterController(state, eventsEmitter){

  //define state change reactions ----------------------------------------------

  var broadcast = function(){
    if (state.eventInProgress){
      eventsEmitter.broadcast('eventStart');
    } else {
      eventsEmitter.broadcast('eventEnd');
      if (state.props.selectedOptionKey.hasChanged){
        eventsEmitter.broadcast('newSelectedOption', state.selectedOptionKey);
      }
    }
  }

  //load reactions -------------------------------------------------------------

  state.addListener('eventInProgress', broadcast);

}
