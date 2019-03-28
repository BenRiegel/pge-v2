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

  var numTilesWidth = 15;
  var numTilesHeight = 7;

  var getCenterTileProps = function(){
    var centerXMap = webMapModel.x / webMapModel.scale;
    var centerYMap = webMapModel.y / webMapModel.scale;
    return {
      xIndex: Math.floor(centerXMap / 256),
      yIndex: Math.floor(centerYMap / 256),
      xOffset: (512 - centerXMap),
      yOffset: (256 - centerYMap),
    }
  }

  var createTiles = function(){
    var centerTileProps = getCenterTileProps();
    for (var i = 0; i < numTilesWidth; i++){
      for (var j = 0; j < numTilesHeight; j++){
        var xIndex = i - Math.floor(numTilesWidth / 2) + centerTileProps.xIndex;
        var yIndex = j - Math.floor(numTilesHeight / 2) + centerTileProps.yIndex;
        var xScreen = xIndex * 256 + centerTileProps.xOffset;
        var yScreen = yIndex * 256 + centerTileProps.yOffset;
        var props = { xIndex, yIndex, xScreen, yScreen };
        var tile1 = new BasemapTile(props, state);
        var tile2 = new BasemapTile(props, state);
        subcomponents.tileSet1.push(tile1);
        subcomponents.tileSet2.push(tile2);
        tileContainer1.appendChildNode(tile1.rootNode);
        tileContainer2.appendChildNode(tile2.rootNode);
      }
    }
  }

  var updateRootTranslate = function(cumulativePan, zoomScaleFactor){
    var x = Math.floor(-cumulativePan.x);
    var y = Math.floor(-cumulativePan.y);
    var translateStr = `scale(${zoomScaleFactor},${zoomScaleFactor}) translate(${x}px, ${y}px)`;
    view.activeTileContainer.setStyle('transform', translateStr);
  }

  var updateResetTiles = function(){
    view.resetTileContainer.setStyle('transform', '');
    var centerTileProps = getCenterTileProps();
    var index = 0;
    var promises = [];
    for (var i = 0; i < numTilesWidth; i++){
      for (var j = 0; j < numTilesHeight; j++){
        var xIndex = i - Math.floor(numTilesWidth / 2) + centerTileProps.xIndex;
        var yIndex = j - Math.floor(numTilesHeight / 2) + centerTileProps.yIndex;
        var xScreen = xIndex * 256 + centerTileProps.xOffset;
        var yScreen = yIndex * 256 + centerTileProps.yOffset;
        var props = { xIndex, yIndex, xScreen, yScreen };
        var tile = view.resetTileSet[index];
        var p = tile.updateAsync('update', props);
        promises.push(p);
        index+=1;
      }
    }
    return Promise.all(promises);
  }

  var toggleActiveTiles = function(){
    view.activeNum = 1 - view.activeNum;
    view.activeTileContainer = tileContainers[view.activeNum];
    view.activeTileContainer.setStyle('z-index', '1');
    view.resetTileContainer = tileContainers[1 - view.activeNum];
    view.resetTileContainer.setStyle('z-index', '0');
    view.activeTileSet = tileSets[view.activeNum];
    view.resetTileSet = tileSets[1 - view.activeNum];
  }

  var onZoomEnd = async function(){
    view.resetTileContainer.setStyle('transform', '');
    await updateResetTiles();
    await view.activeTileContainer.setOpacity('0', true);
    toggleActiveTiles();
    view.resetTileContainer.setOpacity('1');
  }

  var onPanEnd = async function(){
    view.resetTileContainer.setStyle('transform', '');
    await updateResetTiles();
    toggleActiveTiles();
  };

  //load state change reactions ------------------------------------------------

  dispatcher.setListener('view', 'pan', updateRootTranslate);
  dispatcher.setListener('view', 'zoomEnd', onZoomEnd);
  dispatcher.setListener('view', 'panEnd', onPanEnd);

  //init -----------------------------------------------------------------------

  createTiles();
  toggleActiveTiles();

  //public api -----------------------------------------------------------------

/*  this.updateOnZoomHomeEnd = async function(){
    view.resetTileContainer.setStyle('transform', '');
    await updateResetTiles();
    toggleActiveTiles();
  }

  this.fadeDown = function(){
    return root.setOpacity('0', true);
  }

  this.fadeUp = function(){
    return root.setOpacity('1', true);
  }*/

}
