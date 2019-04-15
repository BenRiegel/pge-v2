export default function BasemapLayerOutputViewController(view, model){

  var { nodes, subcomponents } = view;
  var { root, tileContainer1, tileContainer2 } = nodes;
  var { tileSet1, tileSet2 } = subcomponents;

  //helper functions -----------------------------------------------------------

  var activeNum = 0;
  var activeTileContainer = undefined;
  var resetTileContainer = undefined;
  var activeTileSet = undefined;
  var resetTileSet = undefined;

  var updateTileContainer = function(tileContainer){
    var scaleFactor = model.scaleFactor;
    var x = Math.floor(model.macroOffset.x + model.microOffset.x + model.panOffset.x);
    var y = Math.floor(model.macroOffset.y + model.microOffset.y + model.panOffset.y);
    var translateStr = `scale(${scaleFactor},${scaleFactor}) translate(${x}px, ${y}px)`;
    tileContainer.setStyle('transform', translateStr);
  }

  var updateTiles = function(tileSet){
    var promises = [];
    for (var i = 0; i < model.numTilesWidth; i++){
      for (var j = 0; j < model.numTilesHeight; j++){
        var tile = tileSet[i][j];
        var props = model.tileIndices[i][j];
        var p = tile.renderView(props);
        promises.push(p);
      }
    }
    return Promise.all(promises);
  };

  var toggleActiveTiles = function(){
    activeNum = 1 - activeNum;
    activeTileSet = (activeNum === 0) ? tileSet1 : tileSet2;
    activeTileContainer = (activeNum === 0) ? tileContainer1 : tileContainer2;
    activeTileContainer.setStyle('z-index', '1');
    activeTileContainer.setStyle('opacity', '1');
    resetTileSet = (activeNum === 0) ? tileSet2 : tileSet1;
    resetTileContainer = (activeNum === 0) ? tileContainer2 : tileContainer1;
    resetTileContainer.setStyle('z-index', '0');
    resetTileContainer.setStyle('opacity', '0');
  };

  //init -----------------------------------------------------------------------

  toggleActiveTiles();

  //public api -----------------------------------------------------------------

  this.onConfigure = function(){
    updateTileContainer(activeTileContainer);
    return updateTiles(activeTileSet);
  };

  this.updateOnPan = function(){
    updateTileContainer(activeTileContainer);
  };

  this.updateOnZoom = function(){
    updateTileContainer(activeTileContainer);
  };

  this.updateOnZoomHome = async function(){
    resetTileContainer.setStyle('opacity', '1');
    updateTileContainer(resetTileContainer);
    await updateTiles(resetTileSet);
    activeTileContainer.setStyle('opacity', '0');
    toggleActiveTiles();
  };

  this.updateOnZoomEnd = async function(){
    resetTileContainer.setStyle('opacity', '1');
    updateTileContainer(resetTileContainer);
    await updateTiles(resetTileSet);
    await activeTileContainer.transitionStyle('opacity', '0');
    toggleActiveTiles();
  };

  this.updateOnPanEnd = async function(){
    resetTileContainer.setStyle('opacity', '1');
    updateTileContainer(resetTileContainer);
    await updateTiles(resetTileSet);
    activeTileContainer.setStyle('opacity', '0');
    toggleActiveTiles();
  };

  this.fadeDown = function(){
    return root.transitionStyle('opacity', '0');
  };

  this.fadeUp = function(){
    return root.transitionStyle('opacity', '1');
  };

}
