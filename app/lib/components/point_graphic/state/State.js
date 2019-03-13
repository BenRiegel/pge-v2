//imports ----------------------------------------------------------------------

import ObservedObj from '../../../utils/ObservedObj.js';


//exports ----------------------------------------------------------------------

export default function PointGraphicState(){

  var state = new ObservedObj({
    hasSelectedTag: undefined,
    isObscured: false,
    isSelected: undefined,
  });

  //public api -----------------------------------------------------------------

  return state;

}
