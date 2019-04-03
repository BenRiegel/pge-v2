//imports ----------------------------------------------------------------------

import DispatcherController from './subcontrollers/DispatcherController.js';
import ModelController from './subcontrollers/ModelController.js';
import EmitterController from './subcontrollers/EmitterController.js';
import ViewDomController from './subcontrollers/ViewDomController.js';
import ViewInputController from './subcontrollers/ViewInputController.js';
import ViewOutputController from './subcontrollers/ViewOutputController.js';


//exports ----------------------------------------------------------------------

export default function PopupController(dispatcher, model, emitter, view){

  //public api -----------------------------------------------------------------

  return {
    dispatcher: new DispatcherController(dispatcher, view),
    model: new ModelController(model, dispatcher),
    emitter: new EmitterController(emitter, dispatcher),
    viewDom: new ViewDomController(view),
    viewInput: new ViewInputController(view, dispatcher),
    viewOutput: new ViewOutputController(view, model, dispatcher),
  }

}
