//imports ----------------------------------------------------------------------

import DispatcherController from './subcontrollers/DispatcherController.js';
import ModelController from './subcontrollers/ModelController.js';
import ViewController from './subcontrollers/ViewController.js';
import EmitterController from './subcontrollers/EmitterController.js';

//exports ----------------------------------------------------------------------

export default function GraphicsLayerController(dispatcher, emitter, model, view, webMapModel, webMapDimensions){

  //public api -----------------------------------------------------------------

  return {
    dispatcher: new DispatcherController(dispatcher, model, view),
    emitter: new EmitterController(emitter, dispatcher),
    model: new ModelController(model, dispatcher),
    view: new ViewController(view, model, dispatcher, webMapModel, webMapDimensions),
  }

}
