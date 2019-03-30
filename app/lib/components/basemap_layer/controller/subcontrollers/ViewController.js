//imports ----------------------------------------------------------------------

import BasemapTile from '../../../basemap_tile/BasemapTile.js';


//exports ----------------------------------------------------------------------

export default function BasemapLayerViewController(view, state, webMapModel, dispatcher){

  var { nodes, subcomponents } = view;
  var { root, tileContainer1, tileContainer2 } = nodes;
  var { tileSet1, tileSet2 } = subcomponents;
  var tileContainers = [ tileContainer1, tileContainer2 ];
  var tileSets = [ tileSet1, tileSet2 ];

  //configure dom --------------------------------------------------------------

  root.appendChildNode(tileContainer1.node);
  root.appendChildNode(tileContainer2.node);

  //helper functions -----------------------------------------------------------

  var webMapDimensions;
  var activeNum = 0;
  var activeTileContainer = undefined;
  var resetTileContainer = undefined;
  var activeTileSet = undefined;
  var resetTileSet = undefined;
  var numTilesWidth;
  var numTilesHeight;



  var setLayerDimensions = function({width, height}){
    var widthPixelsNeeded = 4 * width;
    numTilesWidth = Math.ceil(widthPixelsNeeded / 256);
    var heightPixelsNeeded = 4 * height;
    numTilesHeight = Math.ceil(heightPixelsNeeded / 256);
  }

  var getCenterTileProps = function(){
    var centerXMap = webMapModel.x / webMapModel.scale;
    var centerYMap = webMapModel.y / webMapModel.scale;
    return {
      xIndex: Math.floor(centerXMap / 256),
      yIndex: Math.floor(centerYMap / 256),
      xOffset: (webMapDimensions.width / 2 - centerXMap),
      yOffset: (webMapDimensions.height / 2 - centerYMap),
    }
  }

  var createTiles = function(){
    for (var i = 0; i < numTilesWidth; i++){
      for (var j = 0; j < numTilesHeight; j++){
        var tile1 = new BasemapTile(state);
        var tile2 = new BasemapTile(state);
        subcomponents.tileSet1.push(tile1);
        subcomponents.tileSet2.push(tile2);
        tileContainer1.appendChildNode(tile1.rootNode);
        tileContainer2.appendChildNode(tile2.rootNode);
      }
    }
  }

  var updateRootTranslate = function(cumulativePan, zoomScaleFactor = 1){
    var x = Math.floor(-cumulativePan.x);
    var y = Math.floor(-cumulativePan.y);
    var translateStr = `scale(${zoomScaleFactor},${zoomScaleFactor}) translate(${x}px, ${y}px)`;
    activeTileContainer.setStyle('transform', translateStr);
  }

  var updateResetTiles = function(){
    resetTileContainer.setStyle('transform', '');
    var centerTileProps = getCenterTileProps();
    var index = 0;
    var promises = [];
    for (var i = 0; i < numTilesWidth; i++){
      for (var j = 0; j < numTilesHeight; j++){
        var xIndex = i - Math.floor(numTilesWidth / 2) + centerTileProps.xIndex;
        var yIndex = j - Math.floor(numTilesHeight / 2) + centerTileProps.yIndex;
        var xScreen = xIndex * 256 + centerTileProps.xOffset;                        //make screencoords static
        var yScreen = yIndex * 256 + centerTileProps.yOffset;
        var props = { xIndex, yIndex, xScreen, yScreen };
        var tile = resetTileSet[index];
        var p = tile.updateAsync('update', props);
        promises.push(p);
        index+=1;
      }
    }
    return Promise.all(promises);
  }

  var toggleActiveTiles = function(){
    activeNum = 1 - activeNum;
    activeTileContainer = tileContainers[activeNum];
    activeTileContainer.setStyle('z-index', '1');
    activeTileContainer.setOpacity('1');
    resetTileContainer = tileContainers[1 - activeNum];
    resetTileContainer.setStyle('z-index', '0');
    resetTileContainer.setOpacity('0');
    activeTileSet = tileSets[activeNum];
    resetTileSet = tileSets[1 - activeNum];
  }

  var onZoomEnd = async function(){
    resetTileContainer.setStyle('transform', '');
    resetTileContainer.setOpacity('1');
    await updateResetTiles();
    await activeTileContainer.setOpacity('0', true);
    toggleActiveTiles();
  }

  var onPanEnd = async function(){
    resetTileContainer.setStyle('transform', '');
    await updateResetTiles();
    toggleActiveTiles();
  };

  var onConfigure = function(mapDimensions){
    webMapDimensions = mapDimensions;
    setLayerDimensions(mapDimensions);
    createTiles();
    return onPanEnd();
  }

  var onFadeDown = function(){
    return root.setOpacity('0', true);
  }

  var onFadeUp = function(){
    return root.setOpacity('1', true);
  }

  //load state change reactions ------------------------------------------------

  dispatcher.setListener('view', 'pan', updateRootTranslate);
  dispatcher.setListener('view', 'zoom', updateRootTranslate);
  dispatcher.setListener('view', 'zoomEnd', onZoomEnd);
  dispatcher.setListener('view', 'panEnd', onPanEnd);
  dispatcher.setListener('view', 'configure', onConfigure);
  dispatcher.setListener('view', 'fadeDown', onFadeDown);
  dispatcher.setListener('view', 'fadeUp', onFadeUp);
  dispatcher.setListener('view', 'zoomHome', onPanEnd);

  //init -----------------------------------------------------------------------

  toggleActiveTiles();

}
