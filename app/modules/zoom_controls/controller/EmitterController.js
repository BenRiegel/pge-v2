export default function EmitterController(state, eventsEmitter, view){

  var broadcast = function(buttonName){
    if (!state.userDisabled){
      eventsEmitter.broadcast(buttonName);
    }
  }

  //set listeners --------------------------------------------------------------

  view.nodes.zoomHomeButton.emitter.addListener('click', broadcast);
  view.nodes.zoomInButton.emitter.addListener('click', broadcast);
  view.nodes.zoomOutButton.emitter.addListener('click', broadcast);

}
