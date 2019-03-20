//imports ----------------------------------------------------------------------

import ObservedObj from '../../../utils/ObservedObj.js';


//exports ----------------------------------------------------------------------

export default function BasemapLayerState(){

  //public state variable ------------------------------------------------------

  var state = new ObservedObj({
    imageTileLevel: undefined,
    numBasemapTiles: undefined,
  });

  //public api -----------------------------------------------------------------

  return state;

}
