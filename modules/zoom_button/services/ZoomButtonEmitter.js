//imports ----------------------------------------------------------------------

import NewEmitter from '../../../lib/Emitter.js';


//exports ----------------------------------------------------------------------

export default function ZoomButtonEmitter(buttonState){

  //creat emitter --------------------------------------------------------------

  var emitter = NewEmitter();

  //define state change reactions ----------------------------------------------

  var broadcast = function(){
    if (buttonState.isActive){
      emitter.broadcast('buttonDown');
    } else {
      emitter.broadcast('buttonUp');
    }
  }

  //load reactions -------------------------------------------------------------

  buttonState.addListener('isActive', 'emitter', 'broadcast', broadcast);

  //public api -----------------------------------------------------------------

  return emitter;

}
