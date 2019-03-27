//imports ----------------------------------------------------------------------

import ComponentModel from '../../../utils/ComponentModel.js';


//exports ----------------------------------------------------------------------

export default function LoaderModel(){

  //create state var -----------------------------------------------------------

  var model = new ComponentModel({
    isActive: false,
  });

  //public api -----------------------------------------------------------------

  return model;

}
