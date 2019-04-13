//imports ----------------------------------------------------------------------

import ComponentModel from '../../../utils/ComponentModel.js';


//exports ----------------------------------------------------------------------

export default function BasemapLayerModel(){

  //public api -----------------------------------------------------------------

  return new ComponentModel({
    numTilesWidth: undefined,
    numTilesHeight: undefined,
    imageTileLevel: undefined,
    numBasemapTiles: undefined,
  });

}
