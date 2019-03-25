//imports ----------------------------------------------------------------------

import ViewController from './subcontrollers/ViewController.js';


//exports ----------------------------------------------------------------------

export default function LoaderController(dispatcher, view){

  //public api -----------------------------------------------------------------

  return {
    view: new ViewController(view, dispatcher),
  }

}
