//imports ----------------------------------------------------------------------

import DispatcherController from './subcontrollers/DispatcherController.js';
import EmitterController from './subcontrollers/EmitterController.js';
import ModelController from './subcontrollers/ModelController.js';
import ViewController from './subcontrollers/ViewController.js';


//exports ----------------------------------------------------------------------

export default function PopupSummaryController(dispatcher, emitter, model, view, popupModel){

  //public api -----------------------------------------------------------------

  return {
    dispatcher: new DispatcherController(dispatcher, view),
    emitter: new EmitterController(emitter, dispatcher),
    model: new ModelController(model, dispatcher),
    view: new ViewController(view, dispatcher, model, popupModel),
  }

}
