//imports ----------------------------------------------------------------------

import BasemapTile from '../../../basemap_tile/BasemapTile.js';


//exports ----------------------------------------------------------------------

export default function BasemapLayerViewDomController(view, model){

  var { nodes, subcomponents } = view;
  var { tileContainer1, tileContainer2 } = nodes;
  var { tileSet1, tileSet2 } = subcomponents;

  //public api -----------------------------------------------------------------

  this.createTiles = function(){
    for (var i = 0; i < model.numTilesWidth; i++){
      for (var j = 0; j < model.numTilesHeight; j++){
        var props = {xPos:i, yPos:j};
        var tile1 = new BasemapTile(props);
        var tile2 = new BasemapTile(props);
        tileSet1.push(tile1);
        tileSet2.push(tile2);
      }
    }
  };

}
