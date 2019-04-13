//imports ----------------------------------------------------------------------

import Emitter from '../../../utils/Emitter.js';


//exports ----------------------------------------------------------------------

export default function WebMapEmitter(){

  //public api -----------------------------------------------------------------

  return new Emitter( ['panEnd', 'zoomEnd'] );

}
