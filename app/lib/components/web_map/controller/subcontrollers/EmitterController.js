export default function WebMapEmitterController(emitter, model){

  //public api -----------------------------------------------------------------

  this.onZoomStart = function(){
    if (model.hasChanged){
      emitter.notify('actionStart');
    }
  };

  this.onZoomEnd = function(){
    if (model.hasChanged){
      emitter.notify('actionEnd');
    }
  };

  this.notifyActionStart = function(){
    emitter.notify('actionStart');
  };

  this.notifyActionEnd = function(){
    emitter.notify('actionEnd');
  };

}
