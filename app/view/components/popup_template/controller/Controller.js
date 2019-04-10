//imports ----------------------------------------------------------------------

import EmitterController from './subcontrollers/EmitterController.js';
import ViewDomController from './subcontrollers/ViewDomController.js';
import ViewInputController from './subcontrollers/ViewInputController.js';
import ViewOutputController from './subcontrollers/ViewOutputController.js';


//exports ----------------------------------------------------------------------

export default function PopupTemplateController(emitter, view){

  //declare subcontrollers -----------------------------------------------------

  var emitterController = new EmitterController(emitter, view);
  var domController = new ViewDomController(view);
  var inputController = new ViewInputController(view);
  var outputController = new ViewOutputController(view);

  //public api -----------------------------------------------------------------

  this.enable = inputController.enable;

  this.disable = inputController.disable;

  this.load = outputController.load;

}
