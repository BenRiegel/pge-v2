//imports ----------------------------------------------------------------------

import ComponentState from '../../lib/ComponentState.js';
import ZoomControlsView from './view/ZoomControlsView.js';


//exports ----------------------------------------------------------------------

export default function ZoomControls(){

  //private code block ---------------------------------------------------------

  var state = new ComponentState({
    isEnabled: true,
  });

  var view = new ZoomControlsView(state);

  //public api -----------------------------------------------------------------

  this.rootNode = view.rootNode;

  this.addClickListener = function(buttonName, cb){
    view.addClickListener(buttonName, cb);
  }

  this.enable = function(){
    state.set('isEnabled', true);
  }

  this.disable = function(){
    state.set('isEnabled', false);
  }

}
