//imports ----------------------------------------------------------------------

import NewEmitter from '../../../lib/Emitter.js';


//exports ----------------------------------------------------------------------

export default function NewEventsController(state, view){

  //private code block ---------------------------------------------------------

  var publicEmitter = NewEmitter();

  view.container.addListener('buttonClicked', async buttonClicked => {
    if (state.isEnabled){
      publicEmitter.broadcast('zoomAction', buttonClicked);
    }
  });

  //public api -----------------------------------------------------------------

  return {
    addListener: publicEmitter.addListener,
  }

}
