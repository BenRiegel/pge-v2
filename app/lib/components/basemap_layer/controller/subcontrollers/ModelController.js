export default function BasemapLayerModelController(model, webMapModel, dispatcher){

  //define user event reactions ------------------------------------------------

  //get rid of these eventually
  var updateProps = function(){
    var imageTileLevel = webMapModel.coords.scale.level;
    imageTileLevel = Math.round(imageTileLevel);
    model.set('imageTileLevel', imageTileLevel);
    var numBasemapTiles = Math.pow(2, imageTileLevel);
    model.set('numBasemapTiles', numBasemapTiles);
  }

  //load reactions -------------------------------------------------------------

  dispatcher.setListener('model', 'configure', updateProps);
  dispatcher.setListener('model', 'zoomEnd', updateProps);
  dispatcher.setListener('model', 'zoomHome', updateProps);

}
