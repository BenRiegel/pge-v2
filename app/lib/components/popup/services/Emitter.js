//imports ----------------------------------------------------------------------

import Emitter from '../../../utils/Emitter.js';


//exports ----------------------------------------------------------------------

export default function PopupEmitter(){

  //public api -----------------------------------------------------------------

  return new Emitter( ['closed', 'expansionStart', 'contractionEnd'] );

}
