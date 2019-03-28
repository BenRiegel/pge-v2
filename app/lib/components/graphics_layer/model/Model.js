//imports ----------------------------------------------------------------------

import ComponentModel from '../../../utils/ComponentModel.js';


//exports ----------------------------------------------------------------------

export default function GraphicsLayerModel(){

  //public state variable ------------------------------------------------------

  var model = new ComponentModel({
    locations: null,
    selectedGraphicId: null,
  });

  //public api -----------------------------------------------------------------

  return model;

}
