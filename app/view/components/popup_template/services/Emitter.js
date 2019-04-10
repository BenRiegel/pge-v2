//imports ----------------------------------------------------------------------

import Emitter from '../../../../lib/utils/Emitter.js';


//exports ----------------------------------------------------------------------

export default function PopupTemplateEmitter(){

  //public api -----------------------------------------------------------------

  return new Emitter( ['readMoreRequest'] );

}
