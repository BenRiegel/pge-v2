//imports ----------------------------------------------------------------------

import ComponentModel from '../../../utils/ComponentModel.js';


//exports ----------------------------------------------------------------------

export default function BasemapLayerModel(){

  //create model var -----------------------------------------------------------

  var model = new ComponentModel({
    imageTileLevel: undefined,
    numBasemapTiles: undefined,
  });

  //public api -----------------------------------------------------------------

  return model;

}
