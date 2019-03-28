//imports ----------------------------------------------------------------------

import Emitter from '../../../utils/Emitter.js';


//exports ----------------------------------------------------------------------

export default function PopupReportEmitter(){

  //public api -----------------------------------------------------------------

  return new Emitter( ['closeRequest', 'contractRequest'] );

}
