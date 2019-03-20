//imports ----------------------------------------------------------------------

import EmitterController from './subcontrollers/EmitterController.js';
import ViewController from './subcontrollers/ViewController.js';


//exports ----------------------------------------------------------------------

export default function ZoomControlsController(emitter, view){

  //public api -----------------------------------------------------------------

  this.emitter = new EmitterController(emitter, view);
  this.view = new ViewController(view);

}
