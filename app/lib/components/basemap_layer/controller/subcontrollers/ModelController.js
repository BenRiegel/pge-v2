export default function BasemapLayerModelController(model, webMapModel){

  //public api -----------------------------------------------------------------

  this.updateProps = function(){
    var imageTileLevel = webMapModel.coords.scale.level;
    imageTileLevel = Math.round(imageTileLevel);
    model.set('imageTileLevel', imageTileLevel);
    var numBasemapTiles = Math.pow(2, imageTileLevel);
    model.set('numBasemapTiles', numBasemapTiles);
  };

  this.setLayerDimensions = function(webMapDimensions){
    var widthPixelsNeeded = 4 * webMapDimensions.width;
    var numTilesWidth = Math.ceil(widthPixelsNeeded / 256);
    var heightPixelsNeeded = 4 * webMapDimensions.height;
    var numTilesHeight = Math.ceil(heightPixelsNeeded / 256);
    model.set('numTilesWidth', numTilesWidth);
    model.set('numTilesHeight', numTilesHeight);
  };

}
