//imports ----------------------------------------------------------------------

import ObservedObj from '../../../utils/ObservedObj.js';


//exports ----------------------------------------------------------------------

export default function PopupModel(){

  //create state var -----------------------------------------------------------

  var model = new ObservedObj({
    content: null,
  });

  //public api -----------------------------------------------------------------

  return model;

}
