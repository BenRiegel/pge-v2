export default function SelectMenuEmitterController(emitter, state){

  //define reactions -----------------------------------------------------------

  var broadcast = function(viewIsUpdating){
    if (viewIsUpdating){
      emitter.broadcast('eventStart');
    } else {
      emitter.broadcast('eventEnd');
      if (state.props.selectedOptionKey.hasChanged){
        emitter.broadcast('newSelectedOption', state.selectedOptionKey);
      }
    }
  }

  //load reactions -------------------------------------------------------------

  state.addListenerByType('isOpen', 'viewIsUpdating', broadcast);

}
