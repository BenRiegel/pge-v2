//imports ----------------------------------------------------------------------

import ViewController from './subcontrollers/ViewController.js';


//exports ----------------------------------------------------------------------

export default function BasemapTileController(dispatcher, view, layerModel){

  //public api -----------------------------------------------------------------

  return {
    view: new ViewController(dispatcher, view, layerModel),
  }

}
