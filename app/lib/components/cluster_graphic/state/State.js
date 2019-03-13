//imports ----------------------------------------------------------------------

import ObservedObj from '../../../utils/ObservedObj.js';


//exports ----------------------------------------------------------------------

export default function ClusterGraphicState(){

  var state = new ObservedObj({
    isSelected: false,
  });

  //public api -----------------------------------------------------------------

  return state;

}
