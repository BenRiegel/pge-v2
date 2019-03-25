//imports ----------------------------------------------------------------------

import Emitter from '../../../utils/Emitter3.js';


//exports ----------------------------------------------------------------------

export default function PopupEmitter(){

  //public api -----------------------------------------------------------------

  return new Emitter( ['open', 'closed', 'actionStart', 'actionEnd'] );

}
