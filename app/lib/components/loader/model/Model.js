//imports ----------------------------------------------------------------------

import ComponentModel from '../../../utils/ComponentModel.js';


//exports ----------------------------------------------------------------------

export default function LoaderModel(){

  //create model var -----------------------------------------------------------

  var model = new ComponentModel({
    isActive: false,
  });

  //public api -----------------------------------------------------------------

  return model;

}
