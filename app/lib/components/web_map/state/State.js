//imports ----------------------------------------------------------------------

import ViewpointState from './ViewpointState.js';
import { latLonToWebMercator } from '../lib/WebMercator.js';
import { levelToValue } from '../lib/WebMapScale.js';


//exports ----------------------------------------------------------------------

export default function WebMapState(props){

  var state = new ViewpointState({
    x: props.initCoords.lon,
    y: props.initCoords.lat,
    scale: props.initScaleLevel,
  });

  //public api -----------------------------------------------------------------

  return state;

}
