//imports ----------------------------------------------------------------------

import ObservedObj from '../../../lib/ObservedObj.js';


//exports ----------------------------------------------------------------------

export default function GraphicsLayerState(){

  //public state variable ------------------------------------------------------

  var state = new ObservedObj({
    mappedLocations: null,
    highlightedGraphicId: null,

    baselineScale: undefined,        /* feel like these should be somewhere else */
  });

  //public api -----------------------------------------------------------------

  return state;

}
