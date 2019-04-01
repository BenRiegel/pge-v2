//imports ----------------------------------------------------------------------

import Emitter from '../../../utils/Emitter.js';


//exports ----------------------------------------------------------------------

export default function PopupEmitter(){

  //public api -----------------------------------------------------------------

  return new Emitter( ['open', 'closed', 'isExpanded', 'isContracted', 'actionStart', 'actionEnd'] );

}
