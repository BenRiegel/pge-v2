export default function WebMapEmitterController(emitter, model){

  //public api -----------------------------------------------------------------

  this.notifyOnAnimateEnd = function(){
    if (model.coords.scale.hasChanged){
      return emitter.notify('zoomEnd');
    } else if (model.coords.x.hasChanged || model.coords.y.hasChanged){
      return emitter.notify('panEnd');
    }
  };

}
