//imports ----------------------------------------------------------------------

import ViewDomController from './subcontrollers/ViewDomController.js';
import ViewOutputController from './subcontrollers/ViewOutputController.js';


//exports ----------------------------------------------------------------------

export default function PopupTemplateController(view){

  //declare subcontrollers -----------------------------------------------------

  var domController = new ViewDomController(view);
  var outputController = new ViewOutputController(view);

  //public api -----------------------------------------------------------------

  this.load = outputController.load;

}
