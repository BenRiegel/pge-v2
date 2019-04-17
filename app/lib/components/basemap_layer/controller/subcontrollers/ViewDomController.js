export default function BasemapLayerViewDomController(view, model){

  var { nodes, subcomponents } = view;
  var { root, tileContainer1, tileContainer2 } = nodes;
  var { tileSet1, tileSet2 } = subcomponents;

  //configure dom --------------------------------------------------------------

  root.appendChildNode(tileContainer1.node);
  root.appendChildNode(tileContainer2.node);

  //public api -----------------------------------------------------------------

  this.loadTiles = function(){
    for (var i = 0; i < model.numTilesWidth; i++){
      for (var j = 0; j < model.numTilesHeight; j++){
        var tile = tileSet1[i][j];
        var tile2 = tileSet2[i][j];
        tileContainer1.appendChildNode(tile.rootNode);
        tileContainer2.appendChildNode(tile2.rootNode);
      }
    }
  };

}
