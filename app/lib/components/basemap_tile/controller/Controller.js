//imports ----------------------------------------------------------------------

import ViewController from './subcontrollers/ViewController.js';


//exports ----------------------------------------------------------------------

export default function BasemapTileController(props, dispatcher, view, layerModel){

  //public api -----------------------------------------------------------------

  return {
    view: new ViewController(props, dispatcher, view, layerModel),
  }

}
