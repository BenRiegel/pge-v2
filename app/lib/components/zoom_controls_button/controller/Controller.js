//imports ----------------------------------------------------------------------

import EmitterController from './subcontrollers/EmitterController.js';
import ViewController from './subcontrollers/ViewController.js';


//exports ----------------------------------------------------------------------

export default function ZoomControlsButtonController(emitter, view, buttonId){

  //public api -----------------------------------------------------------------

  this.emitter = new EmitterController(emitter, view, buttonId);
  this.view = new ViewController(view);

}
