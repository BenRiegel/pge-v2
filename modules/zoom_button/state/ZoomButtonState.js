//imports ----------------------------------------------------------------------

import ComponentState from '../../../lib/ComponentState.js';


//exports ----------------------------------------------------------------------

export default function ZoomButtonState(props){

  //create state var -----------------------------------------------------------

  var state = new ComponentState(props);

  state.updateOnMouseDown = function(){
    state.set('isActive', true);
  }

  state.updateOnMouseUp = function(){
    state.set('isActive', false);
  }

  state.updateOnMouseOut = function(){
    state.set('isActive', false);
  }

  //public api -----------------------------------------------------------------

  return state;

}
