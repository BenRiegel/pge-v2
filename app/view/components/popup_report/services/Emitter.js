//imports ----------------------------------------------------------------------

import Emitter from '../../../../lib/utils/Emitter.js';


//exports ----------------------------------------------------------------------

export default function PopupReportEmitter(){

  //public api -----------------------------------------------------------------

  return new Emitter( ['closeRequest', 'contractRequest'] );

}
