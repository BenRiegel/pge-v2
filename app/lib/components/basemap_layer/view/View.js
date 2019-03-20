//imports ----------------------------------------------------------------------

import RootNode from './nodes/RootNode.js';
import TileContainerNode from './nodes/TileContainerNode.js';


//exports ----------------------------------------------------------------------

export default function BasemapLayerView(state, webMapState){

  //public api -----------------------------------------------------------------

  this.nodes = {
    root: new RootNode(),
    tileContainer1: new TileContainerNode(),
    tileContainer2: new TileContainerNode(),
  };

  this.subcomponents = {
    tileSet1: [],
    tileSet2: [],
  };

  this.activeNum = 0;
  this.activeTileContainer = undefined;
  this.resetTileContainer = undefined;
  this.activeTileSet = undefined;
  this.resetTileSet = undefined;

  this.hasRendered = new Promise(async resolve => {
    //var tileRenderPromises = tiles.map(tile => tile.hasRendered);
    //await tileRenderPromises;
    resolve();
  });

}
