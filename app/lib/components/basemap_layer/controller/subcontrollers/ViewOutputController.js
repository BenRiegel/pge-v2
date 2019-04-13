export default function BasemapLayerOutputViewController(view, model, webMapModel, webMapDimensions){

  var { nodes, subcomponents } = view;
  var { root, tileContainer1, tileContainer2 } = nodes;
  var { tileSet1, tileSet2 } = subcomponents;
  var tileContainers = [ tileContainer1, tileContainer2 ];
  var tileSets = [ tileSet1, tileSet2 ];

  //helper functions -----------------------------------------------------------

  var activeNum = 0;
  var activeTileContainer = undefined;
  var resetTileContainer = undefined;
  var activeTileSet = undefined;
  var resetTileSet = undefined;
  var xOffset;
  var yOffset;

  var setContainerOffsets = function(){
    var centerXMap = webMapModel.x / webMapModel.scale;
    var centerYMap = webMapModel.y / webMapModel.scale;
    var xDiff = centerXMap % 256;
    var yDiff = centerYMap % 256;
    xOffset = (webMapDimensions.width - model.numTilesWidth * 256) / 2 - xDiff;
    yOffset = (webMapDimensions.height - model.numTilesHeight * 256) / 2 - yDiff;
  }

  var getCenterTileIndices = function(){
    var centerXMap = webMapModel.x / webMapModel.scale;
    var centerYMap = webMapModel.y / webMapModel.scale;
    return {
      xIndex: Math.floor(centerXMap / 256),
      yIndex: Math.floor(centerYMap / 256),
    }
  }

  var updateActiveTranslate = function(cumulativePan, zoomScaleFactor = 1){
    var x = Math.floor(xOffset-cumulativePan.x);
    var y = Math.floor(yOffset-cumulativePan.y);
    var translateStr = `scale(${zoomScaleFactor},${zoomScaleFactor}) translate(${x}px, ${y}px)`;
    activeTileContainer.setStyle('transform', translateStr);
  }

  var updateResetTranslate = function(){
    var x = Math.floor(xOffset);
    var y = Math.floor(yOffset);
    var translateStr = `scale(${1},${1}) translate(${x}px, ${y}px)`;
    resetTileContainer.setStyle('transform', translateStr);
  }

  var updateTiles = function(tileSet){
    var centerTileProps = getCenterTileIndices();
    var index = 0;
    var promises = [];
    for (var i = 0; i < model.numTilesWidth; i++){
      for (var j = 0; j < model.numTilesHeight; j++){
        var xIndex = i - Math.floor(model.numTilesWidth / 2) + centerTileProps.xIndex;
        xIndex = xIndex % model.numBasemapTiles;
        if (xIndex < 0){
          xIndex += model.numBasemapTiles;
        }
        var yIndex = j - Math.floor(model.numTilesHeight / 2) + centerTileProps.yIndex;
        var isVisible = (yIndex >= 0 && yIndex < model.numBasemapTiles);
        var { imageTileLevel } = model;
        var props = { xIndex, yIndex, isVisible, imageTileLevel};
        var tile = tileSet[index];
        var p = tile.renderView(props);
        promises.push(p);
        index+=1;
      }
    }
    return Promise.all(promises);
  }

  /*var updateTiles = function(tileSet){
    var centerTileProps = getCenterTileIndices();
    var promises = [];
    for (var tile of tileSet){
      var p = tile.updateAsync('update', centerTileProps);
      promises.push(p);
    }
    return Promise.all(promises);
  }  */

  var setContainerRoles = function(){
    activeTileContainer = tileContainers[activeNum];
    activeTileContainer.setStyle('z-index', '1');
    activeTileContainer.setStyle('opacity', '1');
    resetTileContainer = tileContainers[1 - activeNum];
    resetTileContainer.setStyle('z-index', '0');
    resetTileContainer.setStyle('opacity', '0');
    activeTileSet = tileSets[activeNum];
    resetTileSet = tileSets[1 - activeNum];
  }

  var toggleActiveTiles = function(){
    activeNum = 1 - activeNum;
    setContainerRoles();
  }

  //init -----------------------------------------------------------------------

  setContainerRoles();

  //public api -----------------------------------------------------------------

  this.onConfigure = function(){
    setContainerOffsets();
    updateActiveTranslate({x:0,y:0}, 1);
    return updateTiles(activeTileSet);
  };

  this.updateOnPan = function(cumulativePan){
    updateActiveTranslate(cumulativePan, 1);
  };

  this.updateOnZoom = updateActiveTranslate;

  this.updateOnZoomEnd = async function(){
    resetTileContainer.setStyle('opacity', '1');
    await updateTiles(resetTileSet);
    setContainerOffsets();
    updateResetTranslate();
    await activeTileContainer.transitionStyle('opacity', '0');
    toggleActiveTiles();
  };

  this.updateOnPanEnd = async function(){
    resetTileContainer.setStyle('opacity', '1');
    await updateTiles(resetTileSet);
    setContainerOffsets();
    updateResetTranslate();
    activeTileContainer.setStyle('opacity', '0');
    toggleActiveTiles();
  };

  this.fadeDown = function(){
    return root.transitionStyle('opacity', '0');
  };

  this.fadeUp = function(){
    return root.transitionStyle('opacity', '1');
  };

  this.updateOnZoomHome = async function(){
    resetTileContainer.setStyle('opacity', '1');
    await updateTiles(resetTileSet);
    setContainerOffsets();
    updateResetTranslate();
    activeTileContainer.setStyle('opacity', '0');
    toggleActiveTiles();
  };

}
