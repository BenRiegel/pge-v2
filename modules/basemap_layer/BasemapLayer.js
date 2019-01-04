//imports ----------------------------------------------------------------------

//import GraphicsLayerEmitter from './services/GraphicsLayerEmitter.js';
//import GraphicsLayerState from './state/GraphicsLayerState.js';
//import GraphicState from './state/GraphicState.js';
import BasemapLayerView from './view/BasemapLayerView.js';



//exports ----------------------------------------------------------------------

export default function BasemapLayer(mapDimensions){


  //private code block ---------------------------------------------------------

  var view = new BasemapLayerView();
  //view -----------------------------------------------------------------------

  /*var clickEventHandler = function(evt){
  };

  var container = new NodeInstance('div');
  container.className = 'basemap-layer';
  container.onClick = clickEventHandler;
  var numTilesWidth = calculateTilesNeeded(webMapWidth);
  var numTilesHeight = calculateTilesNeeded(webMapHeight);

  var tiles = [];
  for (var i = 0; i < numTilesWidth; i++){
    for (var j = 0; j < numTilesHeight; j++){
      var tile = NewBasemapTile(i, j);
      tiles.push(tile);
    }
  }
  addChildrenTo(container, tiles);*/

  //public api -----------------------------------------------------------------

  this.rootNode = view.rootNode;

  //this.addListener = eventsEmitter.addListener,

  this.enable = function(){
    state.set('isEnabled', true);
  };

  this.disable = function(){
    state.set('isEnabled', false);
  };

}
