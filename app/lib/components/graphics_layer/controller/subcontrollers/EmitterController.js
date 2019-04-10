export default function GraphicsLayerEmitterController(emitter, view){

  var { nodes } = view;
  var { root } = nodes;

  //define reactions -----------------------------------------------------------

  var onClick = function(graphicDataProps){
    var { id } = graphicDataProps;
    var graphic = view.subcomponents.graphics[id];
    var attributes = graphic.attributes;
    emitter.notify('graphicClicked', graphicDataProps, attributes);
  };

  //set event listeners --------------------------------------------------------

  root.setEventListener('click', onClick);

}
