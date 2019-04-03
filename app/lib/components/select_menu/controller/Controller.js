//imports ----------------------------------------------------------------------

import DispatcherController from './subcontrollers/DispatcherController.js';
import EmitterController from './subcontrollers/EmitterController.js';
import ModelController from './subcontrollers/ModelController.js';
import ViewInputController from './subcontrollers/ViewInputController.js';
import ViewOutputController from './subcontrollers/ViewOutputController.js';
import ViewDomController from './subcontrollers/ViewDomController.js';


//exports ----------------------------------------------------------------------

export default function SelectMenuController(dispatcher, emitter, model, view){

  //public api -----------------------------------------------------------------

  return {
    dispatcher: new DispatcherController(dispatcher, model, view),
    emitter: new EmitterController(emitter, dispatcher, model),
    model: new ModelController(model, dispatcher),
    viewDom: new ViewDomController(view, model, dispatcher),
    viewInput: new ViewInputController(view, dispatcher),
    viewOutput: new ViewOutputController(view, model, dispatcher),
  }

}
