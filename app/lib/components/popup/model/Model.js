//imports ----------------------------------------------------------------------

import ComponentModel from '../../../utils/ComponentModel.js';


//exports ----------------------------------------------------------------------

export default function PopupModel(){

  //create state var -----------------------------------------------------------

  var model = new ComponentModel({
    content: null,
  });

  //public api -----------------------------------------------------------------

  return model;

}
