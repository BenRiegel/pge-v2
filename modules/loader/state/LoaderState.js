//imports ----------------------------------------------------------------------

import ComponentState from '../../../lib/ComponentState.js';


//exports ----------------------------------------------------------------------

export default function LoaderState(props){

  //create state var -----------------------------------------------------------

  var state = new ComponentState(props);

  //modify behavior of isVisible prop ------------------------------------------

  state.setOnChange('isVisible', async function(){
    await this.requestUpdate('spinner', 'visibility');
    await this.requestUpdate('background', 'opacity');
    await this.requestUpdate('background', 'visibility');
  });

  //public api -----------------------------------------------------------------

  return state;

}
