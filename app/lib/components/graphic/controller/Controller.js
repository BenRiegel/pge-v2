//imports ----------------------------------------------------------------------

import ModelController from './subcontrollers/ModelController.js';
import ViewController from './subcontrollers/ViewController.js';


//exports ----------------------------------------------------------------------

export default function GraphicController(props, dispatcher, model, view, layerModel, webMapModel){

  //public api -----------------------------------------------------------------

  return {
    model: new ModelController(model, props, dispatcher, layerModel),
    view: new ViewController(view, props, dispatcher, model, webMapModel),
  }

}
