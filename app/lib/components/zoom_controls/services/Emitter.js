//imports ----------------------------------------------------------------------

import Emitter from '../../../utils/Emitter3.js';


//exports ----------------------------------------------------------------------

export default function ZoomControlsButtonEmitter(){

  //public api -----------------------------------------------------------------

  return new Emitter( ['zoomInRequest', 'zoomOutRequest', 'zoomHomeRequest'] );

}
