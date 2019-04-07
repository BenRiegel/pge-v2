//imports ----------------------------------------------------------------------

import ViewDomController from './subcontrollers/ViewDomController.js';
import ViewOutputController from './subcontrollers/ViewOutputController.js';


//exports ----------------------------------------------------------------------

export default function OptionLabelController(props, view){

  //define subcontrollers ------------------------------------------------------

  var domController = new ViewDomController(view);
  var outputController = new ViewOutputController(props, view);

  //public api -----------------------------------------------------------------

  this.showIndent = outputController.showIndent;

  this.hideIndent = outputController.hideIndent;

}
