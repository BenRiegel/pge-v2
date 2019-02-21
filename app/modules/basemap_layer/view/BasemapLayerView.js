//imports ----------------------------------------------------------------------

import BasemapTile from '../../basemap_tile/BasemapTile.js';
import ContainerNode from './nodes/ContainerNode.js';
import TileContainerNode from './nodes/TileContainerNode.js';


//exports ----------------------------------------------------------------------

export default function BasemapLayerView(mapViewpoint, state, eventsEmitter){

  //create nodes ---------------------------------------------------------------

  var container = new ContainerNode(mapViewpoint, state, eventsEmitter);
  var tileContainer = new TileContainerNode();
  var tileContainerCopy = new TileContainerNode();

  var numTilesWidth = 9;
  var numTilesHeight = 5;

  var tiles = [];
  var tileNodes = [];
  for (var i = 0; i < numTilesWidth; i++){
    for (var j = 0; j < numTilesHeight; j++){
      var xPos = i - Math.floor(numTilesWidth / 2);
      var yPos = j - Math.floor(numTilesHeight / 2);
      var tile = new BasemapTile(xPos, yPos, mapViewpoint, state);
      tiles.push(tile);
      tileNodes.push(tile.rootNode);
    }
  }

  //configure dom --------------------------------------------------------------

  container.node.appendChild(tileContainerCopy.node);
  container.node.appendChild(tileContainer.node);
  tileContainer.addChildNodes(tileNodes);

  //helper function ------------------------------------------------------------

  mapViewpoint.addListener('basemapLayer - copyTiles', () => {
    for (var childNode of tileContainer.node.childNodes){
      var childCopy = childNode.cloneNode(true);
      tileContainerCopy.node.appendChild(childCopy);
    }
  });

  mapViewpoint.addListener('basemapLayer - revealNewTiles', async () => {
    await tileContainerCopy.fadeOut();
    tileContainerCopy.reset();
  });

  //public api -----------------------------------------------------------------

  this.rootNode = container.node;

  this.hasRendered = new Promise(async resolve => {
    container.render();
    var tileRenderPromises = tiles.map(tile => tile.hasRendered);
    await tileRenderPromises;
    resolve();
  });

}
