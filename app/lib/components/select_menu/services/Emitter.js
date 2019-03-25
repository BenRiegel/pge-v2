//imports ----------------------------------------------------------------------

import Emitter from '../../../utils/Emitter3.js';


//exports ----------------------------------------------------------------------

export default function SelectMenuEmitter(){

  //public api -----------------------------------------------------------------

  return new Emitter( ['eventStart', 'eventEnd', 'newSelectedOption'] );

}
