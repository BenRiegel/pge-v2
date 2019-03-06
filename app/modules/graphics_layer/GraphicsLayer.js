//imports ----------------------------------------------------------------------

import GraphicsLayerState from './state/GraphicsLayerState.js';
import GraphicsLayerView from './view/GraphicsLayerView.js';
import StateController from './controllers/StateController.js';
import ViewController from './controllers/ViewController.js';


//exports ----------------------------------------------------------------------

export default function GraphicsLayer(mapDimensions, mapViewpoint){

  //private code block ---------------------------------------------------------

  var state = new GraphicsLayerState();
  var view = new GraphicsLayerView();
  var controller = {
    state: new StateController(mapDimensions, mapViewpoint, state),
    view: new ViewController(state, view),
  }

  //public api -----------------------------------------------------------------

  this.rootNode = view.rootNode;

  this.addClickListener = function(graphicType, cb){
    view.emitter.public.addListener(graphicType, cb);
  };

  this.enable = function(){
    view.props.inputEnabled = true;
  };

  this.disable = function(){
    view.props.inputEnabled = false;
  };

  this.setMappedLocations = function(mappedLocations){
    state.set('mappedLocations', mappedLocations);
  }

  this.highlightGraphic = function(id){
    state.set('highlightedGraphicId', id);
  }

}
