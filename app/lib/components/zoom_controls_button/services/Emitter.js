//imports ----------------------------------------------------------------------

import Emitter from '../../../utils/Emitter3.js';


//exports ----------------------------------------------------------------------

export default function ZoomControlsButtonEmitter(){

  //public api -----------------------------------------------------------------

  this.public = new Emitter( ['click'] );

}
