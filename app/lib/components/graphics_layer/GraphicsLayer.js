//imports ----------------------------------------------------------------------

import Emitter from '../../utils/Emitter.js';
import State from './state/State.js';
import View from './view/View.js';
import StateController from './controllers/StateController.js';
import ViewController from './controllers/ViewController.js';
import EmitterController from './controllers/EmitterController.js';


//exports ----------------------------------------------------------------------

export default function GraphicsLayer(mapDimensions, mapViewpoint){

  //private code block ---------------------------------------------------------

  var state = new State();
  var view = new View();
  var emitter = new Emitter();
  var controller = {
    state: new StateController(state, mapViewpoint),
    view: new ViewController(view, state, mapViewpoint, mapDimensions),
    emitter: new EmitterController(emitter, view),
  }

  //public api -----------------------------------------------------------------

  this.rootNode = view.nodes.root.node;

  this.addEventListener = function(eventName, cb){
    emitter.addListener(eventName, cb);
  };

  this.enable = function(){
    controller.view.updateDomListener(true);
  };

  this.disable = function(){
    controller.view.updateDomListener(false);
  };

  this.loadLocations = function(locations){
    state.set('locations', locations);
  };

  this.filterLocations = function(filter){
    controller.state.filterLocations(filter)
  }

  this.highlightGraphic = function(id){
    state.set('highlightedGraphicId', id);
  }

}
