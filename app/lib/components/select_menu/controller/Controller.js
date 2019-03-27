//imports ----------------------------------------------------------------------

import DispatcherController from './subcontrollers/DispatcherController.js';
import EmitterController from './subcontrollers/EmitterController.js';
import ModelController from './subcontrollers/ModelController.js';
import ViewController from './subcontrollers/ViewController.js';


//exports ----------------------------------------------------------------------

export default function SelectMenuController(dispatcher, emitter, model, view){

  //public api -----------------------------------------------------------------

  return {
    dispatcher: new DispatcherController(dispatcher, model, view),
    emitter: new EmitterController(emitter, dispatcher, model),
    model: new ModelController(model, dispatcher),
    view: new ViewController(view, model, dispatcher),
  }


}
