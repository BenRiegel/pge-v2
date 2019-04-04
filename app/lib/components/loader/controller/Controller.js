//imports ----------------------------------------------------------------------

import ViewDomController from './subcontrollers/ViewDomController.js';
import ViewOutputController from './subcontrollers/ViewOutputController.js';


//exports ----------------------------------------------------------------------

export default function LoaderController(view){

  var domController = new ViewDomController(view);
  var outputController = new ViewOutputController(view);

  //public api -----------------------------------------------------------------

  this.show = outputController.show;
  this.hide = outputController.hide;

}
