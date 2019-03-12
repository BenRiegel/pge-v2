export default function ZoomControlsEmitterController(emitter, view){

  var { subcomponents } = view;
  var { zoomHomeButton, zoomInButton, zoomOutButton } = subcomponents;

  //define reactions -----------------------------------------------------------

  var broadcast = function(buttonId){
    var eventName = `${buttonId}ButtonClicked`;
    emitter.broadcast(eventName);
  }

  //load reactions -------------------------------------------------------------

  zoomHomeButton.addEventListener('click', broadcast);
  zoomInButton.addEventListener('click', broadcast);
  zoomOutButton.addEventListener('click', broadcast);

}
