//imports ----------------------------------------------------------------------

import GraphicsLayerEmitter from './services/GraphicsLayerEmitter.js';
import GraphicsLayerState from './state/GraphicsLayerState.js';
import GraphicsLayerView from './view/GraphicsLayerView.js';


//exports ----------------------------------------------------------------------

export default function GraphicsLayer(mapViewpoint, mapProperties){

  //private code block ---------------------------------------------------------

  var state = new GraphicsLayerState();
  var eventsEmitter = new GraphicsLayerEmitter();
  var view = new GraphicsLayerView(mapViewpoint, mapProperties, state, eventsEmitter);

  //public api -----------------------------------------------------------------

  this.rootNode = view.rootNode;

  this.addListener = eventsEmitter.addListener,

  this.enable = function(){
    state.set('isEnabled', true);
  };

  this.disable = function(){
    state.set('isEnabled', false);
  };

  this.addGraphics = function(graphicsInfoArray){
    for (var graphicInfo of graphicsInfoArray){
      view.addNewGraphic(graphicInfo);
    }
  };

  this.clusterGraphics = function(){
    view.clusterGraphics();
  }

  this.filterGraphics = function(selectedTag){
    state.set('selectedTag', selectedTag);
  }

  this.highlightCluster = function(id){
    state.set('highlightedGraphicId', id);
  }

  this.unhighlightCluster = function(id){
    state.set('highlightedGraphicId', null);
  }

}
