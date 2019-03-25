//imports ----------------------------------------------------------------------

import Emitter from '../../../utils/Emitter3.js';


//exports ----------------------------------------------------------------------

export default function PopupReportEmitter(){

  //public api -----------------------------------------------------------------

  return new Emitter( ['closeRequest', 'contractRequest'] );

}
