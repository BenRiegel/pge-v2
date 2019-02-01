//imports ----------------------------------------------------------------------

import ContainerNode from './nodes/ContainerNode.js';
import TileContainerNode from './nodes/TileContainerNode.js';
import TileNode from './nodes/BasemapTileNode.js';


//exports ----------------------------------------------------------------------

export default function BasemapLayerView(mapViewpoint, mapProperties, layerState, eventsEmitter){

  //create nodes ---------------------------------------------------------------

  var container = new ContainerNode(mapViewpoint, layerState, eventsEmitter);
  var tileContainer = new TileContainerNode();
  var tileContainerCopy = new TileContainerNode();
  var tileNodes = [];
  for (var tileState of layerState.tiles){
    var tileNode = new TileNode(tileState, mapViewpoint, mapProperties);
    tileNodes.push(tileNode);
  }

  //configure dom --------------------------------------------------------------

  container.node.appendChild(tileContainerCopy.node);
  container.node.appendChild(tileContainer.node);
  tileContainer.addChildNodes(tileNodes);

  //helper function ------------------------------------------------------------

  var renderTiles = async function(){
    var promises = [];
    for (var tileNode of tileNodes){
      var p = tileNode.render();
      promises.push(p);
    }
    await Promise.all(promises);
  }

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
    await renderTiles();
    resolve();
  });

}
