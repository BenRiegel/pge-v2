//imports ----------------------------------------------------------------------

import ComponentModel from '../../../utils/ComponentModel.js';


//exports ----------------------------------------------------------------------

export default function SelectMenuModel(){

  //create state var -----------------------------------------------------------

  var model = new ComponentModel({
    selectedOptionKey: null,
    isOpen: false,
  });

  //public api -----------------------------------------------------------------

  return model;

}
