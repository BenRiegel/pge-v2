export default function GraphicsLayerEmitterController(emitter, view){

  var { nodes } = view;
  var { root } = nodes;

  //define reactions -----------------------------------------------------------

  var broadcast = function(...args){
    emitter.broadcast(...args);
  }

  //load reactions -------------------------------------------------------------

  root.onClick = broadcast;

}
