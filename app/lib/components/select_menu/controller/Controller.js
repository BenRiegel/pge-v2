//imports ----------------------------------------------------------------------

import EmitterController from './subcontrollers/EmitterController.js';
import ModelController from './subcontrollers/ModelController.js';
import ViewController from './subcontrollers/ViewController.js';


//exports ----------------------------------------------------------------------

export default function SelectMenuController(model, emitter, view){

  //public api -----------------------------------------------------------------

  this.emitter = new EmitterController(emitter, model);
  this.model = new ModelController(model, view)
  this.view = new ViewController(view, model);

}
