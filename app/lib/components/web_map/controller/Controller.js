//imports ----------------------------------------------------------------------

import DispatcherController from './subcontrollers/DispatcherController.js';
import PanDispatcherController from './subcontrollers/PanDispatcherController.js';
import ModelController from './subcontrollers/ModelController.js';
import ViewController from './subcontrollers/ViewController.js';


//exports ----------------------------------------------------------------------

export default function WebMapController(config, dispatcher, model, view){

  //public api -----------------------------------------------------------------

  return {
    dispatcher: new DispatcherController(dispatcher, view),
    pan: new PanDispatcherController(dispatcher, view),
    model: new ModelController(model, config, dispatcher),
    view: new ViewController(view, model, dispatcher),
  }

}
