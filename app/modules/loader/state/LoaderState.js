//imports ----------------------------------------------------------------------

import ComponentState from '../../../lib/ComponentState2.js';


//exports ----------------------------------------------------------------------

export default function LoaderState(){

  //create state var -----------------------------------------------------------

  var state = new ComponentState({
    isVisible: false,
  });

  //modify behavior of isVisible prop ------------------------------------------

  state.setOnChange('isVisible', async function(){
    this.requestUpdate('spinner - visibility');
    await this.requestUpdateAsync('background - opacity');
    this.requestUpdate('background - visibility');
  });

  //public api -----------------------------------------------------------------

  return state;

}
