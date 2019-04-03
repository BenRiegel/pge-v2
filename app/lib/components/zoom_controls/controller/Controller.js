//imports ----------------------------------------------------------------------

import DispatcherController from './subcontrollers/DispatcherController.js';
import EmitterController from './subcontrollers/EmitterController.js';
import ViewDomController from './subcontrollers/ViewDomController.js';
import ViewInputController from './subcontrollers/ViewInputController.js';


//exports ----------------------------------------------------------------------

export default function ZoomControlsController(dispatcher, emitter, view){

  //public api -----------------------------------------------------------------

  return {
    dispatcher: new DispatcherController(dispatcher, view),
    emitter: new EmitterController(emitter, dispatcher),
    viewDom: new ViewDomController(view),
    viewInput: new ViewInputController(view, dispatcher),
  }

}
