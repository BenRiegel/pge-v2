//imports ----------------------------------------------------------------------

import BasemapTile from '../../../basemap_tile/BasemapTile.js';


//exports ----------------------------------------------------------------------

export default function BasemapLayerViewDomController(view){

  var { nodes, subcomponents } = view;
  var { root, tileContainer1, tileContainer2 } = nodes;
  var { tileSet1, tileSet2 } = subcomponents;

  //configure dom --------------------------------------------------------------

  root.appendChildNode(tileContainer1.node);
  root.appendChildNode(tileContainer2.node);

  //public api -----------------------------------------------------------------

  this.loadTiles = function(){
    var tileSet1Nodes = tileSet1.map(tile => tile.rootNode);
    tileContainer1.appendChildNodes(tileSet1Nodes);
    var tileSet2Nodes = tileSet2.map(tile => tile.rootNode);
    tileContainer2.appendChildNodes(tileSet2Nodes);
  };

}
