//imports ----------------------------------------------------------------------

import NewEmitter from '../../../lib/Emitter.js';


//exports ----------------------------------------------------------------------

export default function NewEventsController(state, container){

  //private code block ---------------------------------------------------------

  var publicEmitter = NewEmitter();

  container.addListener('graphicClicked', async graphicId => {
    if (state.isEnabled){
      console.log(graphicId);
    }
  });

  //public api -----------------------------------------------------------------

  return {
    addListener: publicEmitter.addListener,
  }

}
