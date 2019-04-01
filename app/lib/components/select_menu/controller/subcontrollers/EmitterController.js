export default function SelectMenuEmitterController(emitter, dispatcher, model){

  //define event reactions -----------------------------------------------------

  var onOptionClick = function(){
    if (model.props.selectedOptionKey.hasChanged){
      emitter.notify('newSelectedOption', model.selectedOptionKey);
    }
  }

  var onActionInProgress = function(actionInProgress){
    if (actionInProgress){
      emitter.notify('actionStart');
    } else {
      emitter.notify('actionEnd');
    }
  }

  //load event reactions -------------------------------------------------------

  dispatcher.setListener('public', 'optionClick', onOptionClick);
  dispatcher.setListener('public', 'actionInProgress', onActionInProgress);

}
