export default function SelectMenuEmitterController(emitter, dispatcher, model){

  //define event reactions -----------------------------------------------------

  var onOptionClick = function(status){
    if (status === 'start'){
      emitter.notify('actionStart');
    } else if (status === 'end'){
      emitter.notify('actionEnd');
      if (model.props.selectedOptionKey.hasChanged){
        emitter.notify('newSelectedOption', model.selectedOptionKey);
      }
    }
  }

  //load event reactions -------------------------------------------------------

  dispatcher.setListener('emitter', 'optionClick', onOptionClick);

}
