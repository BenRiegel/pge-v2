export default function WebMapEmitterController(emitter, model){

  //public api -----------------------------------------------------------------

  this.onZoomStart = function(){
    if (model.hasChanged){
      emitter.notify('actionStart', 'zoom');
    }
  };

  this.onZoomEnd = function(){
    if (model.hasChanged){
      emitter.notify('actionEnd', 'zoom');
    }
  };

  this.notifyActionStart = function(actionName){
    emitter.notify('actionStart', actionName);
  };

  this.notifyActionEnd = function(actionName){
    emitter.notify('actionEnd', actionName);
  };

}
