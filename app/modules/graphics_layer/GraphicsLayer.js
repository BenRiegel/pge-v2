//imports ----------------------------------------------------------------------

import Emitter from '../../lib/Emitter.js';
import GraphicsLayerState from './state/GraphicsLayerState.js';
import GraphicsLayerView from './view/GraphicsLayerView.js';


//exports ----------------------------------------------------------------------

export default function GraphicsLayer(mapViewpoint, mapMovement, createGraphics){

  //private code block ---------------------------------------------------------

  var state = new GraphicsLayerState(mapViewpoint, mapMovement, createGraphics);
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

  this.updateGraphics = async function(selectedTag){
    await state.set('selectedTag', selectedTag);
  }

  this.setNewGraphics = function(graphics){
    state.set('graphics', graphics);
  }

  this.highlightGraphic = function(id){
    state.set('highlightedGraphicId', id);
  }

}
