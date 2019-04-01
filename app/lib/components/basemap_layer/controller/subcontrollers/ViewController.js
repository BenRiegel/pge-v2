//imports ----------------------------------------------------------------------

import BasemapTile from '../../../basemap_tile/BasemapTile.js';


//exports ----------------------------------------------------------------------

export default function BasemapLayerViewController(view, model, webMapModel, dispatcher, webMapDimensions){

  var { nodes, subcomponents } = view;
  var { root, tileContainer1, tileContainer2 } = nodes;
  var { tileSet1, tileSet2 } = subcomponents;
  var tileContainers = [ tileContainer1, tileContainer2 ];
  var tileSets = [ tileSet1, tileSet2 ];

  //configure dom --------------------------------------------------------------

  root.appendChildNode(tileContainer1.node);
  root.appendChildNode(tileContainer2.node);

  //helper functions -----------------------------------------------------------

  var activeNum = 0;
  var activeTileContainer = undefined;
  var resetTileContainer = undefined;
  var activeTileSet = undefined;
  var resetTileSet = undefined;
  var numTilesWidth;
  var numTilesHeight;
  var xOffset;
  var yOffset;

  var setLayerDimensions = function(){
    var widthPixelsNeeded = 4 * webMapDimensions.width;
    numTilesWidth = Math.ceil(widthPixelsNeeded / 256);
    var heightPixelsNeeded = 4 * webMapDimensions.height;
    numTilesHeight = Math.ceil(heightPixelsNeeded / 256);
  }

  var setContainerOffsets = function(){
    var centerXMap = webMapModel.x / webMapModel.scale;
    var centerYMap = webMapModel.y / webMapModel.scale;
    var xDiff = centerXMap % 256;
    var yDiff = centerYMap % 256;
    xOffset = (webMapDimensions.width - numTilesWidth * 256) / 2 - xDiff;
    yOffset = (webMapDimensions.height - numTilesHeight * 256) / 2 - yDiff;
  }

  var getCenterTileIndices = function(){
    var centerXMap = webMapModel.x / webMapModel.scale;
    var centerYMap = webMapModel.y / webMapModel.scale;
    return {
      xIndex: Math.floor(centerXMap / 256),
      yIndex: Math.floor(centerYMap / 256),
    }
  }

  var createTiles = function(){
    for (var i = 0; i < numTilesWidth; i++){
      for (var j = 0; j < numTilesHeight; j++){
        var props = {xPos:i, yPos:j};
        var tile1 = new BasemapTile(props);
        var tile2 = new BasemapTile(props);
        subcomponents.tileSet1.push(tile1);
        subcomponents.tileSet2.push(tile2);
        tileContainer1.appendChildNode(tile1.rootNode);
        tileContainer2.appendChildNode(tile2.rootNode);
      }
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
    for (var i = 0; i < numTilesWidth; i++){
      for (var j = 0; j < numTilesHeight; j++){
        var xIndex = i - Math.floor(numTilesWidth / 2) + centerTileProps.xIndex;
        xIndex = xIndex % model.numBasemapTiles;
        if (xIndex < 0){
          xIndex += model.numBasemapTiles;
        }
        var yIndex = j - Math.floor(numTilesHeight / 2) + centerTileProps.yIndex;
        var isVisible = (yIndex >= 0 && yIndex < model.numBasemapTiles);
        var { imageTileLevel } = model;
        var props = { xIndex, yIndex, isVisible, imageTileLevel};
        var tile = tileSet[index];
        var p = tile.updateAsync('update', props);
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
    activeTileContainer.setOpacity('1');
    resetTileContainer = tileContainers[1 - activeNum];
    resetTileContainer.setStyle('z-index', '0');
    resetTileContainer.setOpacity('0');
    activeTileSet = tileSets[activeNum];
    resetTileSet = tileSets[1 - activeNum];
  }

  var toggleActiveTiles = function(){
    activeNum = 1 - activeNum;
    setContainerRoles();
  }

  var onZoomEnd = async function(){
    resetTileContainer.setOpacity('1');
    await updateTiles(resetTileSet);
    setContainerOffsets();
    updateResetTranslate();
    await activeTileContainer.setOpacity('0', true);
    toggleActiveTiles();
  }

  var onPanEnd = async function(){
    resetTileContainer.setOpacity('1');
    await updateTiles(resetTileSet);
    setContainerOffsets();
    updateResetTranslate();
    activeTileContainer.setOpacity('0');
    toggleActiveTiles();
  };

  var onConfigure = async function(){
    setLayerDimensions();
    createTiles();
    setContainerOffsets();
    updateActiveTranslate({x:0,y:0}, 1);
    await updateTiles(activeTileSet);
  }

  var onFadeDown = function(){
    return root.setOpacity('0', true);
  }

  var onFadeUp = function(){
    return root.setOpacity('1', true);
  }

  //load state change reactions ------------------------------------------------

  dispatcher.setListener('view', 'pan', updateActiveTranslate);
  dispatcher.setListener('view', 'zoom', updateActiveTranslate);
  dispatcher.setListener('view', 'zoomEnd', onZoomEnd);
  dispatcher.setListener('view', 'panEnd', onPanEnd);
  dispatcher.setListener('view', 'configure', onConfigure);
  dispatcher.setListener('view', 'fadeDown', onFadeDown);
  dispatcher.setListener('view', 'fadeUp', onFadeUp);
  dispatcher.setListener('view', 'zoomHome', onPanEnd);

  //init -----------------------------------------------------------------------

  setContainerRoles();

}
