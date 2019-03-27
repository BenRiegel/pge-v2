//imports ----------------------------------------------------------------------

import ComponentModel from '../../../utils/ComponentModel.js';


//exports ----------------------------------------------------------------------

export default function SelectMenuOptionModel(){

  //create state var -----------------------------------------------------------

  var model = new ComponentModel({
    isSelected: false,
  });

  //public api -----------------------------------------------------------------

  return model;

}
