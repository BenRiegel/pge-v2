export default function SelectMenuEmitterController(emitter, model){

  //public api -----------------------------------------------------------------

  this.notifyOnActionStart = function(){
    var actionName = model.isOpen ? 'closingStart' : 'openingStart';
    emitter.notify(actionName);
  };

  this.notifyOnActionEnd = function(){
    var actionName = model.isOpen ? 'openingEnd' : 'closingEnd';
    emitter.notify(actionName);
    if (model.props.selectedOptionKey.hasChanged){
      emitter.notify('newSelectedOption', model.newSelectedOption);
    }
  };

}
