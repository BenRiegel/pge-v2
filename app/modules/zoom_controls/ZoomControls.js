//imports ----------------------------------------------------------------------

import Emitter from '../../lib/Emitter.js';
import ComponentState from '../../lib/ComponentState2.js';
import ZoomControlsView from './view/ZoomControlsView.js';


//exports ----------------------------------------------------------------------

export default function ZoomControls(){

  //private code block ---------------------------------------------------------

  var state = new ComponentState({
    isEnabled: true,
  });
  var eventsEmitter = new Emitter();
  var view = new ZoomControlsView(state, eventsEmitter);

  //public api -----------------------------------------------------------------

  this.rootNode = view.rootNode;

  this.addClickListener = eventsEmitter.addListener;

  this.enable = function(){
    state.set('isEnabled', true);
  }

  this.disable = function(){
    state.set('isEnabled', false);
  }

}
