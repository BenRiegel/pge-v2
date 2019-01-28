//imports ----------------------------------------------------------------------

import Emitter from '../../lib/Emitter.js';
import BasemapLayerState from './state/BasemapLayerState.js';
import BasemapLayerView from './view/BasemapLayerView.js';


//exports ----------------------------------------------------------------------

export default function BasemapLayer(mapViewpoint, mapProperties){

  //private code block ---------------------------------------------------------

  var state = new BasemapLayerState(mapViewpoint, mapProperties);
  var eventsEmitter = new Emitter();
  var view = new BasemapLayerView(mapViewpoint, mapProperties, state, eventsEmitter);

  //public api -----------------------------------------------------------------

  this.rootNode = view.rootNode;

  this.hasRendered = view.hadRendered;

  this.addListener = function(eventName, cb){
    eventsEmitter.addListener(eventName, cb);
  };

  this.enable = function(){
    state.set('isEnabled', true);
  };

  this.disable = function(){
    state.set('isEnabled', false);
  };

}
