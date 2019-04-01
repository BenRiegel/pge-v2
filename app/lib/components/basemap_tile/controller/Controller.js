//imports ----------------------------------------------------------------------

import ViewController from './subcontrollers/ViewController.js';


//exports ----------------------------------------------------------------------

export default function BasemapTileController(props, dispatcher, view){

  //public api -----------------------------------------------------------------

  return {
    view: new ViewController(props, dispatcher, view),
  }

}
