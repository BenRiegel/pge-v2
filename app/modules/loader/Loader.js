//imports ----------------------------------------------------------------------

import LoaderState from './state/LoaderState.js';
import LoaderView from './view/LoaderView.js';
import LoaderController from './controller/LoaderController.js';


//exports ----------------------------------------------------------------------

export default function Loader(){

  //private code block ---------------------------------------------------------

  var state = new LoaderState();
  var view = new LoaderView();
  var controller = new LoaderController(state, view);

  //public api -----------------------------------------------------------------

  this.rootNode = view.rootNode;

  this.activate = function(){
    state.set('isActivated', true);
  };

  this.terminate = function(isFadingOut){
    view.isFadingOut = isFadingOut;
    return state.set('isActivated', false);
  };

}
