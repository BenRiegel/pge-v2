//imports ----------------------------------------------------------------------

import ModelController from './subcontrollers/ModelController.js';
import ViewController from './subcontrollers/ViewController.js';
import EmitterController from './subcontrollers/EmitterController.js';


//exports ----------------------------------------------------------------------

export default function BasemapLayerController(dispatcher, emitter, model, view, webMapModel){

  //public api -----------------------------------------------------------------

  return {
    emitter: new EmitterController(emitter),
    model: new ModelController(model, webMapModel, dispatcher),
    view: new ViewController(view, model, webMapModel, dispatcher),
  }

}
