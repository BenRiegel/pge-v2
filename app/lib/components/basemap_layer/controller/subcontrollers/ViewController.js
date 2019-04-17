//imports ----------------------------------------------------------------------

import BasemapTile from '../../../basemap_tile/BasemapTile.js';


//exports ----------------------------------------------------------------------

export default function BasemapLayerViewDomController(view, model){

  var { subcomponents } = view;
  var { tileSet1, tileSet2 } = subcomponents;

  //helper functions -----------------------------------------------------------

  var createTileSet = function(tileSet){
    for (var i = 0; i < model.numTilesWidth; i++){
      var newColumn = [];
      for (var j = 0; j < model.numTilesHeight; j++){
        var props = {xPos:i, yPos:j};
        var tile = new BasemapTile(props);
        newColumn.push(tile);
      }
      tileSet.push(newColumn);
    }
  };

  //public api -----------------------------------------------------------------

  this.createTiles = function(){
    createTileSet(tileSet1);
    createTileSet(tileSet2);
  };

}
