//imports ----------------------------------------------------------------------

import NewEmitter from '../../../lib/Emitter.js';


//exports ----------------------------------------------------------------------

export default function ZoomButtonEmitter(buttonProps){

  //creat emitter --------------------------------------------------------------

  var emitter = NewEmitter();

  var buttonId = buttonProps.containerClassName;

  emitter.onButtonClick = function(){
    this.broadcast('click', buttonId);
  }

  //public api -----------------------------------------------------------------

  return emitter;

}
