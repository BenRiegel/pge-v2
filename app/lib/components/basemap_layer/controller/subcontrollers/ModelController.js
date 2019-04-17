export default function BasemapLayerModelController(model, webMapModel){

  //private code block ---------------------------------------------------------

  var imageTileLevel;
  var numBasemapTiles;
  var macroOffset = {x:0, y:0};
  var microOffset = {x:0, y:0};
  var panOffset = {x:0, y:0};

  var setLayerDimensions = function(webMapDimensions){
    var widthPixelsNeeded = 4 * webMapDimensions.width;
    var numTilesWidth = Math.ceil(widthPixelsNeeded / 256);
    var heightPixelsNeeded = 4 * webMapDimensions.height;
    var numTilesHeight = Math.ceil(heightPixelsNeeded / 256);
    model.set('numTilesWidth', numTilesWidth);
    model.set('numTilesHeight', numTilesHeight);
  };

  var setMacroOffset = function(webMapDimensions){
    var xOffset = (webMapDimensions.width - model.numTilesWidth * 256) / 2;
    var yOffset = (webMapDimensions.height - model.numTilesHeight * 256) / 2;
    macroOffset = {x:xOffset, y:yOffset};
    updateContainerOffset();
  };

  var updateContainerOffset = function(){
    var containerOffset = {
      x: macroOffset.x + microOffset.x + panOffset.x,
      y: macroOffset.y + microOffset.y + panOffset.y,
    };
    model.set('containerOffset', containerOffset);
  };

  var updateImageTileLevel = function(){
    imageTileLevel = Math.round(webMapModel.coords.scale.level);
  };

  var updateBasemapDimensions = function(){
    numBasemapTiles = Math.pow(2, imageTileLevel);
  };

  var updateMicroOffset = function(){
    var centerXMap = webMapModel.x / webMapModel.scale;
    var centerYMap = webMapModel.y / webMapModel.scale;
    var xDiff = -centerXMap % 256;
    var yDiff = -centerYMap % 256;
    microOffset = {x:xDiff, y:yDiff};
    updateContainerOffset();
  };

  var updateTileIndices = function(){
    var centerXMap = webMapModel.x / webMapModel.scale;
    var centerYMap = webMapModel.y / webMapModel.scale;
    var centerTileXIndex = Math.floor(centerXMap / 256);
    var centerTileYIndex =  Math.floor(centerYMap / 256);
    var tileIndices = [];
    for (var i = 0; i < model.numTilesWidth; i++){
      var newColumn = [];
      for (var j = 0; j < model.numTilesHeight; j++){
        var xIndex = i - Math.floor(model.numTilesWidth / 2) + centerTileXIndex;
        xIndex = xIndex % numBasemapTiles;
        if (xIndex < 0){
          xIndex += numBasemapTiles;
        }
        var yIndex = j - Math.floor(model.numTilesHeight / 2) + centerTileYIndex;
        var isVisible = (yIndex >= 0 && yIndex < numBasemapTiles);
        var props = { xIndex, yIndex, isVisible, imageTileLevel };
        newColumn.push(props);
      }
      tileIndices.push(newColumn);
    }
    model.set('tileIndices', tileIndices);
  };

  var updateScaleFactor = function(scaleFactor){
    model.set('scaleFactor', scaleFactor);
  };

  var updatePanOffset = function(cumulativePan){
    var offsetX = cumulativePan.x;
    var offsetY = cumulativePan.y;
    panOffset = {x:offsetX, y:offsetY};
    updateContainerOffset();
  };

  var resetPanOffset = function(){
    panOffset = {x:0, y:0};
    updateContainerOffset();
  };

  //public api -----------------------------------------------------------------

  this.updateOnConfigure = function(webMapDimensions){
    setLayerDimensions(webMapDimensions);
    setMacroOffset(webMapDimensions);
    updateImageTileLevel();
    updateBasemapDimensions();
    updateMicroOffset();
    updateTileIndices();
    resetPanOffset();
  };

  this.updateOnPan = function(cumulativePan){
    updatePanOffset(cumulativePan);
  };

  this.updateOnPanEnd = function(){
    updateMicroOffset();
    updateTileIndices();
    resetPanOffset();
  };

  this.updateOnZoom = function(cumulativePan, zoomScaleFactor){
    updateScaleFactor(zoomScaleFactor);
    updatePanOffset(cumulativePan);
  };

  this.updateOnZoomEnd = function(){
    updateImageTileLevel();
    updateBasemapDimensions();
    updateMicroOffset();
    updateTileIndices();
    updateScaleFactor(1);
    resetPanOffset();
  };

  this.updateOnZoomHome = function(){
    updateImageTileLevel();
    updateBasemapDimensions();
    updateMicroOffset();
    updateTileIndices();
    updateScaleFactor(1);
    resetPanOffset();
  };

}
