//imports ----------------------------------------------------------------------

import ContainerNode from './nodes/ContainerNode.js';
import TileContainerNode from './nodes/TileContainerNode.js';


//exports ----------------------------------------------------------------------

export default function BasemapLayerView(mapViewpoint, mapMovement, state, eventsEmitter){

  //create nodes ---------------------------------------------------------------

  var container = new ContainerNode(mapViewpoint, state, eventsEmitter);
  var tileContainer = new TileContainerNode();
  var tileContainerCopy = new TileContainerNode();
  var tileNodes = [];
  for (var tile of state.tiles){
    tileNodes.push(tile.rootNode);
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

  mapMovement.addListener('type', 'basemapLayer', 'copyTiles', () => {
    for (var childNode of tileContainer.node.childNodes){
      var childCopy = childNode.cloneNode(true);
      tileContainerCopy.node.appendChild(childCopy);
    }
  });

  mapMovement.addListener('type', 'basemapLayer', 'revealNewTiles', async () => {
    await tileContainerCopy.fadeOut();
    tileContainerCopy.reset();
  });

  //public api -----------------------------------------------------------------

  this.rootNode = container.node;

  this.hasRendered = new Promise(async resolve => {
    container.render();
    //await renderTiles();  //this needs to be fixed
    resolve();
  });

}
