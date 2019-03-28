export default function GraphicsLayerEmitterController(emitter, dispatcher){

  //define reactions -----------------------------------------------------------

  var onPointGraphicClicked = function(...args){
    emitter.notify('pointGraphicClicked', ...args);
  }

  var onClusterGraphicClicked = function(...args){
    emitter.notify('clusterGraphicClicked', ...args);
  }

  //load reactions -------------------------------------------------------------

  dispatcher.setListener('public', 'pointGraphicClicked', onPointGraphicClicked);
  dispatcher.setListener('public', 'clusterGraphicClicked', onClusterGraphicClicked);


}
