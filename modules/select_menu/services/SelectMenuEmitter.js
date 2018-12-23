//imports ----------------------------------------------------------------------

import NewEmitter from '../../../lib/Emitter.js';


//exports ----------------------------------------------------------------------

export default function SelectMenuEmitter(state){

  //creat emitter --------------------------------------------------------------

  var emitter = NewEmitter();

  //define state change reactions ----------------------------------------------

  var broadcast = function(){
    if (state.isTransitioning){
      emitter.broadcast('processingStart');
    } else {
      emitter.broadcast('processingEnd');
      var newSelectedOption = state.propHasChanged('selectedOptionKey');
      if (newSelectedOption){
        emitter.broadcast('newSelectedOption', state.selectedOptionKey);
      }
    };
  }

  //load reactions -------------------------------------------------------------

  state.addListener('isTransitioning', 'emitter', 'broadcast', broadcast);

  //public api -----------------------------------------------------------------

  return emitter;

}
