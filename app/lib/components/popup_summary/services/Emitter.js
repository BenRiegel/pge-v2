//imports ----------------------------------------------------------------------

import Emitter from '../../../utils/Emitter.js';


//exports ----------------------------------------------------------------------

export default function PopupSummaryEmitter(){

  //public api -----------------------------------------------------------------

  return new Emitter( ['closeRequest', 'readMoreRequest'] );

}
