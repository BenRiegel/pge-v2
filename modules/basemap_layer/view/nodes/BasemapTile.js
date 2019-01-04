//imports ----------------------------------------------------------------------

import DomElement from '../../../../lib/DomElement.js';


//exports ----------------------------------------------------------------------

export default function BasemapTile(tileState){

  //create dom element ---------------------------------------------------------

  var tile = new DomElement('img', 'basemap-tile');



    /*var updateVisibility = function(){
      if (graphicState.isSelected && !graphicState.isCombined){
        graphic.setVisibility('visible');
      } else {
        graphic.setVisibility('hidden');
      }
    }*/

  var updateDimensions = function(){
    tile.setStyle('width', `${Math.ceil(tileState.tileSize)}px`);
    tile.setStyle('height', `${graphicState.radius * 2}px`);

    node.setStyle('width', `${Math.ceil(mapProperties.tileSize)}px`);
    node.setStyle('height', `${Math.ceil(mapProperties.tileSize)}px`);
  };

  var updateScreenCoords = function(){
      var x = graphicState.screenCoords.x;
      var y = graphicState.screenCoords.y;
      graphic.setStyle('transform', `translate(-50%, -50%) translate(${x}px, ${y}px)`);
    }



  //public api -----------------------------------------------------------------

  this.node = tile.node;

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

  };

}

/*panTo: async function(deltaXPx, deltaYPx){
  leftScreenCoord += deltaXPx;
  topScreenCoord += deltaYPx;
  var transformStr = `translate(${Math.floor(leftScreenCoord)}px, ${Math.floor(topScreenCoord)}px)`;
  await getNextAnimationFrame();
  node.setStyle('transform', transformStr);
}*/
