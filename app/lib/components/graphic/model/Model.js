//imports ----------------------------------------------------------------------

import ComponentModel from '../../../utils/ComponentModel.js';


//exports ----------------------------------------------------------------------

export default function GraphicModel(){

  //public state variable ------------------------------------------------------

  var model = new ComponentModel({
    isSelected: undefined,
  });

  //public api -----------------------------------------------------------------

  return model;

}
