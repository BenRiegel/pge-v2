//imports ----------------------------------------------------------------------

import LoaderState from './state/LoaderState.js';
import LoaderView from './view/LoaderView.js';


//exports ----------------------------------------------------------------------

export default function Loader(){

  //private code block ---------------------------------------------------------

  var state = new LoaderState({
    isFadingOut: false,
    isVisible: false,
  });

  var view = new LoaderView(state);

  view.render();

  //public api -----------------------------------------------------------------

  this.rootNode = view.rootNode;

  this.show = function(){
    state.set('isVisible', true);
  };

  this.hide = function(){
    state.set('isFadingOut', false);
    state.set('isVisible', false);
  };

  this.fadeOutAndHide = async function(){
    state.set('isFadingOut', true);
    await state.set('isVisible', false);
  }

}
