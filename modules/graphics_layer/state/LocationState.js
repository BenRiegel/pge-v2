//imports ----------------------------------------------------------------------

import { latLonToWebMercator } from '../../../lib/WebMercator.js';


//exports ----------------------------------------------------------------------

export default function LocationState(props, layerState){

  //create state var -----------------------------------------------------------

  var state = {
    id: props.id,
    worldCoords: latLonToWebMercator(props.geoCoords),
    isMapped: false,
  };

  //define state change reactions ----------------------------------------------

  var updateIsMapped = function(){
    state.isMapped = props.tags.includes(layerState.selectedTag);
  }

  //load state change reactions ------------------------------------------------

  layerState.addListener('selectedTag', 'location', 'isMapped', updateIsMapped);

  //public api -----------------------------------------------------------------

  return state;

}
