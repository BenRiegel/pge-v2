//imports ----------------------------------------------------------------------

import ComponentState from '../../../lib/ComponentState.js';


//exports ----------------------------------------------------------------------

export default function SelectMenuOptionState(){

  var state = new ComponentState({
    isSelected: undefined,
  });

  //public api -----------------------------------------------------------------

  return state;

}
