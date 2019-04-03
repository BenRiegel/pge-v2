//imports ----------------------------------------------------------------------

import DispatcherController from './subcontrollers/DispatcherController.js';
import PanDispatcherController from './subcontrollers/PanDispatcherController.js';
import ModelController from './subcontrollers/ModelController.js';
import ViewInputController from './subcontrollers/ViewInputController.js';
import ViewOutputController from './subcontrollers/ViewOutputController.js';
import ViewDomController from './subcontrollers/ViewDomController.js';


//exports ----------------------------------------------------------------------

export default function WebMapController(config, dispatcher, model, view){

  //public api -----------------------------------------------------------------

  return {
    dispatcher: new DispatcherController(dispatcher, view),
    pan: new PanDispatcherController(dispatcher, view),
    model: new ModelController(model, config, dispatcher),
    viewDom: new ViewDomController(view),
    viewInput: new ViewInputController(view, model, dispatcher),
    viewOutput: new ViewOutputController(view, model, dispatcher),
  }

}
