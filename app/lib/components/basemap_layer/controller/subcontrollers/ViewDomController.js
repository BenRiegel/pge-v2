//imports ----------------------------------------------------------------------

import BasemapTile from '../../../basemap_tile/BasemapTile.js';


//exports ----------------------------------------------------------------------

export default function BasemapLayerViewController(view, model, webMapModel, dispatcher, webMapDimensions){

  var { nodes } = view;
  var { root, tileContainer1, tileContainer2 } = nodes;

  //configure dom --------------------------------------------------------------

  root.appendChildNode(tileContainer1.node);
  root.appendChildNode(tileContainer2.node);

  //helper functions -----------------------------------------------------------

  var numTilesWidth;
  var numTilesHeight;

  var setLayerDimensions = function(){
    var widthPixelsNeeded = 4 * webMapDimensions.width;
    numTilesWidth = Math.ceil(widthPixelsNeeded / 256);
    var heightPixelsNeeded = 4 * webMapDimensions.height;
    numTilesHeight = Math.ceil(heightPixelsNeeded / 256);
  }

  var createTiles = function(){
    for (var i = 0; i < numTilesWidth; i++){
      for (var j = 0; j < numTilesHeight; j++){
        var props = {xPos:i, yPos:j};
        var tile1 = new BasemapTile(props);
        var tile2 = new BasemapTile(props);
        subcomponents.tileSet1.push(tile1);
        subcomponents.tileSet2.push(tile2);
        tileContainer1.appendChildNode(tile1.rootNode);
        tileContainer2.appendChildNode(tile2.rootNode);
      }
    }
  }


  //load state change reactions ------------------------------------------------

  dispatcher.setListener('view', 'pan', updateActiveTranslate);
  dispatcher.setListener('view', 'zoom', updateActiveTranslate);
  dispatcher.setListener('view', 'zoomEnd', onZoomEnd);
  dispatcher.setListener('view', 'panEnd', onPanEnd);
  dispatcher.setListener('view', 'configure', onConfigure);
  dispatcher.setListener('view', 'fadeDown', onFadeDown);
  dispatcher.setListener('view', 'fadeUp', onFadeUp);
  dispatcher.setListener('view', 'zoomHome', onPanEnd);

  //init -----------------------------------------------------------------------

  setContainerRoles();

}
