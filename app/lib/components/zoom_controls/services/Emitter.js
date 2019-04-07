//imports ----------------------------------------------------------------------

import Emitter from '../../../utils/Emitter.js';


//exports ----------------------------------------------------------------------

export default function ZoomControlsEmitter(){

  //public api -----------------------------------------------------------------

  return new Emitter( ['zoomInRequest',
                       'zoomOutRequest',
                       'zoomHomeRequest'] );

}
