//imports ----------------------------------------------------------------------

import ObservedObj from '../../../utils/ObservedObj.js';


//exports ----------------------------------------------------------------------

export default function GraphicsLayerState(){

  //public state variable ------------------------------------------------------

  var state = new ObservedObj({
    locations: null,
    filteredLocations: null,
    highlightedGraphicId: null,
    baselineScale: undefined,        /* feel like these should be somewhere else */
  });

  //public api -----------------------------------------------------------------

  return state;

}
