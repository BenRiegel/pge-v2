export default function BasemapLayerModelController(model, webMapModel){

  //public api -----------------------------------------------------------------

  this.updateImageTileLevel = function(){
    var imageTileLevel = Math.round(webMapModel.coords.scale.level);
    model.set('imageTileLevel', imageTileLevel);
  };

  this.updateBasemapDimensions = function(){
    var numBasemapTiles = Math.pow(2, model.imageTileLevel);
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

  this.setMacroOffset = function(webMapDimensions){
    var xOffset = (webMapDimensions.width - model.numTilesWidth * 256) / 2;
    var yOffset = (webMapDimensions.height - model.numTilesHeight * 256) / 2;
    var macroOffset = {x:xOffset, y:yOffset};
    model.set('macroOffset', macroOffset);
  }

  this.updateMicroOffset = function(){
    var centerXMap = webMapModel.x / webMapModel.scale;
    var centerYMap = webMapModel.y / webMapModel.scale;
    var xDiff = -centerXMap % 256;
    var yDiff = -centerYMap % 256;
    var microOffset = {x:xDiff, y:yDiff};
    model.set('microOffset', microOffset);
  };

  this.updateTileIndices = function(){
    var centerXMap = webMapModel.x / webMapModel.scale;
    var centerYMap = webMapModel.y / webMapModel.scale;
    var centerTileXIndex = Math.floor(centerXMap / 256);
    var centerTileYIndex =  Math.floor(centerYMap / 256);
    var tileIndices = [];
    for (var i = 0; i < model.numTilesWidth; i++){
      var newColumn = [];
      for (var j = 0; j < model.numTilesHeight; j++){
        var xIndex = i - Math.floor(model.numTilesWidth / 2) + centerTileXIndex;
        xIndex = xIndex % model.numBasemapTiles;
        if (xIndex < 0){
          xIndex += model.numBasemapTiles;
        }
        var yIndex = j - Math.floor(model.numTilesHeight / 2) + centerTileYIndex;
        var isVisible = (yIndex >= 0 && yIndex < model.numBasemapTiles);
        var { imageTileLevel } = model;
        var props = { xIndex, yIndex, isVisible, imageTileLevel};
        newColumn.push(props);
      }
      tileIndices.push(newColumn);
    }
    model.set('tileIndices', tileIndices);
  };

  this.updateScaleFactor = function(scaleFactor){
    model.set('scaleFactor', scaleFactor);
  };

  this.updatePanOffset = function(cumulativePan){
    var offsetX = -cumulativePan.x;   //don't like the negative here
    var offsetY = -cumulativePan.y;
    model.set('panOffset', {x:offsetX, y:offsetY});
  };

  this.resetPanOffset = function(){
    model.set('panOffset', {x:0, y:0});
  };

}
