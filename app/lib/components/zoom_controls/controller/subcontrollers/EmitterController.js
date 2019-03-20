export default function ZoomControlsEmitterController(emitter, view){

  var { subcomponents } = view;
  var { zoomHomeButton, zoomInButton, zoomOutButton } = subcomponents;

  //define reactions -----------------------------------------------------------

  var notifyPublic = function(buttonId){
    var eventName = `${buttonId}Request`;
    emitter.public.notify(eventName);
  }

  //load reactions -------------------------------------------------------------

  zoomHomeButton.addEventListener('click', notifyPublic);
  zoomInButton.addEventListener('click', notifyPublic);
  zoomOutButton.addEventListener('click', notifyPublic);

}
