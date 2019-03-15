export default function WebMapDispatcherController(dispatcher, view){

  var { subcomponents } = view;
  var { graphicsLayer } = subcomponents;

  //define user event reactions ------------------------------------------------

  var selectPointGraphic = async function(id, worldCoords, attributes){
    dispatcher.broadcast('selectGraphic', {type:'point', id} );
    await dispatcher.asyncBroadcast('panTo', worldCoords);
    await dispatcher.broadcast('openPopup', attributes);
  }

  var selectClusterGraphic = async function(id, worldCoords, attributes){
    dispatcher.broadcast('selectGraphic', {type:'cluster', id} );
    await dispatcher.asyncBroadcast('zoomTo', worldCoords);
    dispatcher.broadcast('unselectGraphic');
  }

  //load reactions -------------------------------------------------------------

  graphicsLayer.addEventListener('pointGraphicClicked', selectPointGraphic);
  graphicsLayer.addEventListener('clusterGraphicClicked', selectClusterGraphic);

}
