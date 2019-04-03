export default function ZoomControlsEmitterController(emitter, dispatcher){

  //define reactions -----------------------------------------------------------

  var onButtonClick = function(buttonId){
    var eventName = `${buttonId}Request`;
    emitter.notify(eventName);
  }

  //load reactions -------------------------------------------------------------

  dispatcher.setListener('emitter', 'buttonClick', onButtonClick);

}
