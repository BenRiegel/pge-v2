//imports ----------------------------------------------------------------------

import NodeInstance from '../lib/NodeInstance.js';
import '../../stylesheets/basemap_tile.scss';


//exports ----------------------------------------------------------------------

export default function NewBasemapTile(widthPosition, heightPosition){

  //view -----------------------------------------------------------------------

  var node = new NodeInstance('img');
  node.className = 'basemap-tile';

  //public api -----------------------------------------------------------------

  return{
    rootNode: node.rootNode,
    render: function(mapProperties){
      var leftScreenCoord = this.widthPosition * mapProperties.tileSize - mapProperties.leftMapOffset; //+ mapProperties.expansionDistance;
      var topScreenCoord = this.heightPosition * mapProperties.tileSize - mapProperties.topMapOffset; //+ mapProperties.expansionDistance;
      leftScreenCoord = Math.floor(leftScreenCoord);
      topScreenCoord = Math.floor(topScreenCoord);
      var yIndex = this.heightPosition + mapProperties.topTileCoord;
      if (yIndex < 0 || yIndex > mapProperties.numBasemapTiles){
        this.rootNode.style.opacity = '0';
      } else {
        this.rootNode.style.opacity = '1';
      }
      var xIndex = (this.widthPosition + mapProperties.leftTileCoord) % mapProperties.numBasemapTiles;
      xIndex += (xIndex < 0) ? mapProperties.numBasemapTiles : 0;
      var transformStr = `translate(${leftScreenCoord}px, ${topScreenCoord}px)`;
      this.rootNode.style.transform = transformStr; //+ `scale(${mapProperties.scaleFactor}, ${mapProperties.scaleFactor}`;
      this.rootNode.style.width = `${Math.ceil(mapProperties.tileSize)}px`;
      this.rootNode.style.height = `${Math.ceil(mapProperties.tileSize)}px`;
      var basemapURLString = "https://services.arcgisonline.com/arcgis/rest/services/World_Street_Map/MapServer/tile";
      this.rootNode.src = basemapURLString + `/${mapProperties.imageTileLevel}/${yIndex}/${xIndex}`;
    }

  };

}
