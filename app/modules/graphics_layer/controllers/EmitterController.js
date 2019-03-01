export default function EmitterController(state, eventsEmitter, view){

  //define event reactions -----------------------------------------------------

  var broadcast = function(graphicType, graphicId, worldCoords){
    if (!state.userDisabled){
      eventsEmitter.broadcast(graphicType, graphicId, worldCoords);
    }
  }

  //load reactions -------------------------------------------------------------

  view.nodes.container.emitter.addListener('click', broadcast);

}
