//imports ----------------------------------------------------------------------

import ModelController from './subcontrollers/ModelController.js';
import ViewController from './subcontrollers/ViewController.js';


//exports ----------------------------------------------------------------------

export default function LoaderController(dispatcher, model, view){

  //public api -----------------------------------------------------------------

  return {
    model: new ModelController(model, dispatcher),
    view: new ViewController(view, model, dispatcher),
  }

}
