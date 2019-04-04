//imports ----------------------------------------------------------------------

import ComponentModel from '../../../utils/ComponentModel.js';


//exports ----------------------------------------------------------------------

export default function SelectMenuModel(){

  //create state var -----------------------------------------------------------

  var model = new ComponentModel({
    optionKeys: [],
    selectedOptionKey: null,
  });

  //public api -----------------------------------------------------------------

  return model;

}
