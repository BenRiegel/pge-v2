//imports ----------------------------------------------------------------------

import Emitter from '../../lib/Emitter.js';
import GraphicsLayerState from './state/GraphicsLayerState.js';
import GraphicState from './state/GraphicState.js';
import LocationState from './state/LocationState.js';
import GraphicsLayerView from './view/GraphicsLayerView.js';


//exports ----------------------------------------------------------------------

export default function GraphicsLayer(mapViewpoint, mapProperties){

  //private code block ---------------------------------------------------------

  var layerState = new GraphicsLayerState(mapViewpoint, mapProperties);
  var eventsEmitter = new Emitter();
  var view = new GraphicsLayerView(layerState, eventsEmitter);

  //public api -----------------------------------------------------------------

  this.rootNode = view.rootNode;

  this.addClickListener = function(graphicType, cb){
    eventsEmitter.addListener(graphicType, cb);
  };

  this.enable = function(){
    layerState.set('isEnabled', true);
  };

  this.disable = function(){
    layerState.set('isEnabled', false);
  };

  this.addGraphics = function(graphicsInfoArray){
    for (var graphicInfo of graphicsInfoArray){
      var locationState = new LocationState(graphicInfo, layerState);
      layerState.addNewLocationState(locationState);
      var graphicState = new GraphicState(graphicInfo, mapViewpoint, mapProperties, layerState);
      layerState.addNewGraphicState(graphicState);
      view.addNewGraphicNode(graphicInfo.id, graphicState);
    }
  };

  this.filterGraphics = function(selectedTag){
    layerState.set('selectedTag', selectedTag);
  }

  this.highlightCluster = function(id){
    layerState.set('highlightedGraphicId', id);
  }

  this.unhighlightCluster = function(id){
    layerState.set('highlightedGraphicId', null);
  }

}
