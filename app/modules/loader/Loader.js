//imports ----------------------------------------------------------------------

import LoaderState from './state/LoaderState.js';
import LoaderView from './view/LoaderView.js';


//exports ----------------------------------------------------------------------

export default function Loader(){

  //private code block ---------------------------------------------------------

  var state = new LoaderState();
  var view = new LoaderView(state);

  //public api -----------------------------------------------------------------

  this.rootNode = view.rootNode;

  this.hasRendered = view.hasRendered;

  this.show = function(){
    state.set('isAnimating', false);
    state.set('isVisible', true);
  };

  this.hide = async function( {fadeOutOnHide} ){
    state.set('isAnimating', fadeOutOnHide);
    await state.set('isVisible', false);
  };

}
