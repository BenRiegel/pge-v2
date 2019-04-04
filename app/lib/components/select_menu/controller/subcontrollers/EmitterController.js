export default function SelectMenuEmitterController(emitter){

  //public api -----------------------------------------------------------------

  this.notifyActionStart = function(){
    emitter.notify('actionStart');
  };

  this.notifyActionEnd = function(){
    emitter.notify('actionEnd');
  };

  this.notifyNewSelectedOption = function(selectedOptionKey){
    emitter.notify('newSelectedOption', selectedOptionKey);
  };

}
