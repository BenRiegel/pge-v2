export default function GraphicsLayerEmitterController(emitter, view){

  var { nodes, subcomponents } = view;
  var { root } = nodes;

  //define reactions -----------------------------------------------------------

  var broadcast = function(type, id){
    if (type === 'point'){
      var graphic = view.subcomponents.pointGraphics[id];
    } else if (type === 'cluster'){
      var graphic = view.subcomponents.clusterGraphics[id];
    }
    var worldCoords = graphic.worldCoords;
    var attributes =  graphic.attributes;
    emitter.broadcast('graphicClicked', type, id, worldCoords, attributes);
  }

  //load reactions -------------------------------------------------------------

  root.onClick = broadcast;

}
