//imports ----------------------------------------------------------------------

import ViewDomController from './subcontrollers/ViewDomController.js';
import ViewOutputController from './subcontrollers/ViewOutputController.js';


//exports ----------------------------------------------------------------------

export default function LoaderController(dispatcher, view){

  //public api -----------------------------------------------------------------

  return {
    viewDom: new ViewDomController(view),
    viewOutput: new ViewOutputController(view, dispatcher),
  }

}
