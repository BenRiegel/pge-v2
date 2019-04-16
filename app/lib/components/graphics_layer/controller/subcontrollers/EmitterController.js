export default function GraphicsLayerEmitterController(emitter, view, webMapModel){

  var { nodes } = view;
  var { root } = nodes;

  //define reactions -----------------------------------------------------------

  var onClick = function(type, id, worldCoords){
    var graphic = view.subcomponents.graphics[id];
    var attributes = graphic.attributes;
    if (type === 'point'){
      emitter.notify('pointGraphicClicked', id, worldCoords, attributes);
    } else if (type === 'cluster'){
      emitter.notify('clusterGraphicClicked', id, worldCoords);
    }
  };

  //set event listeners --------------------------------------------------------

  root.setEventListener('click', onClick);

  //public api -----------------------------------------------------------------

  this.notifyUpdateRequest = function(){
    emitter.notify('graphicsUpdateRequest', webMapModel.scale);
  };

}
