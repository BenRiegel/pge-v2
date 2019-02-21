//imports ----------------------------------------------------------------------

import Emitter from '../../lib/Emitter.js';
import GraphicsLayerState from './state/GraphicsLayerState.js';
import GraphicsService from './services/GraphicsService.js';
import GraphicsLayerView from './view/GraphicsLayerView.js';


//exports ----------------------------------------------------------------------

export default function GraphicsLayer(mapDimensions, mapViewpoint){

  //private code block ---------------------------------------------------------

  var graphicsService = new GraphicsService(mapViewpoint);
  var state = new GraphicsLayerState(mapDimensions, mapViewpoint, graphicsService);
  var eventsEmitter = new Emitter();
  var view = new GraphicsLayerView(mapViewpoint, state, eventsEmitter);

  //public api -----------------------------------------------------------------

  this.rootNode = view.rootNode;

  this.addClickListener = function(graphicType, cb){
    eventsEmitter.addListener(graphicType, cb);
  };

  this.enable = function(){
    state.set('isEnabled', true);
  };

  this.disable = function(){
    state.set('isEnabled', false);
  };

  this.loadLocations = function(locations){
    graphicsService.loadLocations(locations);
  }

  this.filterGraphics = function(selectedTag){
    state.set('selectedTag', selectedTag)
  }

  this.highlightGraphic = function(id){
    state.set('highlightedGraphicId', id);
  }

}
