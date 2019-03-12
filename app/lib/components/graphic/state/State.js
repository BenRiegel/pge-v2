//imports ----------------------------------------------------------------------

import ObservedObj from '../../../utils/ObservedObj.js';


//exports ----------------------------------------------------------------------

export default function GraphicState(){

  var state = new ObservedObj({
    isHighlighted: false,
  });

  //public api -----------------------------------------------------------------

  return state;

}
