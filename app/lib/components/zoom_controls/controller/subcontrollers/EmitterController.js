export default function ZoomControlsEmitterController(emitter){

  //public api -----------------------------------------------------------------

  this.onButtonClick = function(buttonId){
    var eventName = `${buttonId}Request`;
    emitter.notify(eventName);
  };

}
