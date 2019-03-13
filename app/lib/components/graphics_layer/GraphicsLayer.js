//imports ----------------------------------------------------------------------

import Emitter from '../../utils/Emitter.js';
import State from './state/State.js';
import View from './view/View.js';
import ViewController from './controllers/ViewController.js';
import EmitterController from './controllers/EmitterController.js';


//exports ----------------------------------------------------------------------

export default function GraphicsLayer(mapDimensions, webMapState){

  //private code block ---------------------------------------------------------

  var state = new State();
  var view = new View();
  var emitter = new Emitter();
  var controller = {
    view: new ViewController(view, state, webMapState, mapDimensions),
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

  this.setGraphics = function(graphicPropsList){
    controller.view.setGraphics(graphicPropsList);
  }

  this.setSelectedTag = function(selectedTag){
    state.set('selectedTag', selectedTag);
  }

  //get rid of these eventually
  this.resetGraphics = controller.view.resetGraphics;

  this.updateGraphicsOnPan = controller.view.updateGraphicsOnPan;

  this.updateGraphicsOnZoom = controller.view.updateGraphicsOnZoom;

}
