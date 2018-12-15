//imports ----------------------------------------------------------------------

import NodeInstance from '../lib/NodeInstance.js';
import { getNextAnimationFrame } from '../lib/Animation.js';
import '../../stylesheets/basemap_tile.scss';


//exports ----------------------------------------------------------------------

export default function NewBasemapTile(widthPosition, heightPosition){

  //state ----------------------------------------------------------------------

  var leftScreenCoord,
      topScreenCoord;

  //view -----------------------------------------------------------------------

  var node = new NodeInstance('img');
  node.className = 'basemap-tile';

  //public api -----------------------------------------------------------------

  return{
    rootNode: node.rootNode,
    render: function(mapProperties){
      leftScreenCoord = widthPosition * mapProperties.tileSize - mapProperties.leftMapOffset;// + mapProperties.expansionDistance;
      topScreenCoord = heightPosition * mapProperties.tileSize - mapProperties.topMapOffset;// + mapProperties.expansionDistance;
      //leftScreenCoord = Math.floor(leftScreenCoord);
      //topScreenCoord = Math.floor(topScreenCoord);
      var yIndex = heightPosition + mapProperties.topTileCoord;
      if (yIndex < 0 || yIndex > mapProperties.numBasemapTiles){
        node.setStyle('opacity', '0');
      } else {
        node.setStyle('opacity', '1');
      }
      var xIndex = (widthPosition + mapProperties.leftTileCoord) % mapProperties.numBasemapTiles;
      xIndex += (xIndex < 0) ? mapProperties.numBasemapTiles : 0;
      var transformStr = `translate(${Math.floor(leftScreenCoord)}px, ${Math.floor(topScreenCoord)}px)`;
      //transformStr += `scale(${mapProperties.scaleFactor}, ${mapProperties.scaleFactor}`;
      node.setStyle('transform', transformStr); //+ `scale(${mapProperties.scaleFactor}, ${mapProperties.scaleFactor}`;
      node.setStyle('width', `${Math.ceil(mapProperties.tileSize)}px`);
      node.setStyle('height', `${Math.ceil(mapProperties.tileSize)}px`);
      var basemapURLString = "https://services.arcgisonline.com/arcgis/rest/services/World_Street_Map/MapServer/tile";
      node.src = basemapURLString + `/${mapProperties.imageTileLevel}/${yIndex}/${xIndex}`;
    },
    panTo: async function(deltaXPx, deltaYPx){
      leftScreenCoord += deltaXPx;
      topScreenCoord += deltaYPx;
      var transformStr = `translate(${Math.floor(leftScreenCoord)}px, ${Math.floor(topScreenCoord)}px)`;
      await getNextAnimationFrame();
      node.setStyle('transform', transformStr);
    }
  };

}
