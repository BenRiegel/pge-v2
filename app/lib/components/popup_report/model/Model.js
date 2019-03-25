//imports ----------------------------------------------------------------------

import ObservedObj from '../../../utils/ObservedObj.js';


//exports ----------------------------------------------------------------------

export default function PopupSummaryModel(){

  //create state var -----------------------------------------------------------

  var model = new ObservedObj({
    content: null,
  });

  //public api -----------------------------------------------------------------

  return model;

}
