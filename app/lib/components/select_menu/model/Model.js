//imports ----------------------------------------------------------------------

import ComponentModel from '../../../utils/ComponentModel.js';


//exports ----------------------------------------------------------------------

export default function SelectMenuModel(){

  //public api -----------------------------------------------------------------

  return new ComponentModel({
    optionKeys: null,
    selectedOptionKey: null,
    isOpen: false,
  });

}
