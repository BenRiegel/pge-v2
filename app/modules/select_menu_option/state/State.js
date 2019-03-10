//imports ----------------------------------------------------------------------

import ObservedObj from '../../../lib/ObservedObj.js';


//exports ----------------------------------------------------------------------

export default function SelectMenuOptionState(){

  var state = new ObservedObj({
    isSelected: undefined,
  });

  //public api -----------------------------------------------------------------

  return state;

}
