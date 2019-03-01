//imports ----------------------------------------------------------------------

import Emitter from '../../lib/Emitter.js';
import GraphicsLayerState from './state/GraphicsLayerState.js';
import GraphicsLayerView from './view/GraphicsLayerView.js';
import StateController from './controllers/StateController.js';
import EmitterController from './controllers/EmitterController.js';
import ViewController from './controllers/ViewController.js';


//exports ----------------------------------------------------------------------

export default function GraphicsLayer(mapDimensions, mapViewpoint){

  //private code block ---------------------------------------------------------

  var state = new GraphicsLayerState();
  var eventsEmitter = new Emitter();
  var view = new GraphicsLayerView();
  var controller = {
    state: new StateController(mapDimensions, mapViewpoint, state),
    emitter: new EmitterController(state, eventsEmitter, view),
    view: new ViewController(state, view),
  }

  //public api -----------------------------------------------------------------

  this.rootNode = view.rootNode;

  this.addClickListener = function(graphicType, cb){
    eventsEmitter.addListener(graphicType, cb);
  };

  this.enable = function(){
    state.set('userDisabled', false);
  };

  this.disable = function(){
    state.set('userDisabled', true);
  };

  this.setMappedLocations = function(mappedLocations){
    state.set('mappedLocations', mappedLocations);
  }

  this.highlightGraphic = function(id){
    state.set('highlightedGraphicId', id);
  }

}
