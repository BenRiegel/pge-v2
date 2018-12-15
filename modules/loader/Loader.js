//imports ----------------------------------------------------------------------

import IsVisibleProp from './models/IsVisibleProp';
import NewBackgroundView from './views/BackgroundView.js';
import NewSpinnerView from './views/SpinnerView.js';
import NewDomController from './controllers/DomController.js';
import NewBackgroundController from './controllers/BackgroundController.js';
import NewSpinnerController from './controllers/SpinnerController.js';


//exports ----------------------------------------------------------------------

export default function NewLoader(){

  //private code block ---------------------------------------------------------

  var state = {
    fadeOut: undefined,
    isVisible: new IsVisibleProp(),
  };

  var view = {
    background: NewBackgroundView(),
    spinner: NewSpinnerView(),
  };

  var controller = {
    dom: NewDomController(view),
    background: NewBackgroundController(state, view.background),
    spinner: NewSpinnerController(state, view.spinner),
  };

  //public api -----------------------------------------------------------------

  return {
    rootNode: view.background.node,
    show: function(){
      state.isVisible.set(true);
    },
    hide: async function( {fadeOut} ){
      state.fadeOut = fadeOut;
      await state.isVisible.set(false);
    },
  }

}
