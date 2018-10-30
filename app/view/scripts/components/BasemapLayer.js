//imports ----------------------------------------------------------------------

import { addChildrenTo } from '../lib/ViewUtils.js';
import NodeInstance from '../lib/NodeInstance.js';
import NewBasemapTile from './BasemapTile.js';
import '../../stylesheets/basemap_layer.scss';


//module code block ------------------------------------------------------------

var calculateTilesNeeded = function(dimensionPx){
  var baseTilesNeeded = Math.trunc(dimensionPx / 256);
  var remainder = dimensionPx % 256;
  return (remainder > 1) ? baseTilesNeeded + 2 : baseTilesNeeded + 1;
};


//exports ----------------------------------------------------------------------

export default function NewBasemapLayer(webMapWidth, webMapHeight){

  //view -----------------------------------------------------------------------

  var clickEventHandler = function(evt){
  };

  var container = new NodeInstance('div');
  container.className = 'basemap-layer';
  container.onClick = clickEventHandler;
  var numTilesWidth = calculateTilesNeeded(webMapWidth);
  var numTilesHeight = calculateTilesNeeded(webMapHeight);

  var tiles = [];
  for (var i = 0; i < numTilesWidth; i++){
    for (var j = 0; j < numTilesHeight; j++){
      var tile = NewBasemapTile(i, j);
      tiles.push(tile);
    }
  }
  addChildrenTo(container, tiles);

  //public api -----------------------------------------------------------------

  return {
    rootNode: container.rootNode,
    enable: function(){
      container.onClick = clickEventHandler;
    },
    disable: function(){
      container.onClick = null;
    },
  }

}
