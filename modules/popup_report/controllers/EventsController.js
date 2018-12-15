//imports ----------------------------------------------------------------------

import NewEmitter from '../../../lib/Emitter.js';


//exports ----------------------------------------------------------------------

export default function NewEventsController(state, view){

  //private code block ---------------------------------------------------------

  var publicEmitter = NewEmitter();

  view.closeButton.addListener('click', () => {
    if (state.isEnabled){
      publicEmitter.broadcast('closeAction');
    }
  });

  view.contractButton.addListener('click', () => {
    if (state.isEnabled){
      publicEmitter.broadcast('contractAction');      
    }
  });

  //public api -----------------------------------------------------------------

  return {
    addListener: publicEmitter.addListener,
  }

}
