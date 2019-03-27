//imports ----------------------------------------------------------------------

import DispatcherController from './subcontrollers/DispatcherController.js';
import ModelController from './subcontrollers/ModelController.js';
import EmitterController from './subcontrollers/EmitterController.js';
import ViewController from './subcontrollers/ViewController.js';


//exports ----------------------------------------------------------------------

export default function PopupController(dispatcher, model, emitter, view){

  //public api -----------------------------------------------------------------

  return {
    dispatcher: new DispatcherController(dispatcher, view),
    model: new ModelController(model, dispatcher),
    emitter: new EmitterController(emitter, dispatcher),
    view: new ViewController(view, model, dispatcher),
  }

}
