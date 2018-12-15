//imports ----------------------------------------------------------------------

import { latLonToWebMercator } from '../services/WebMercator.js';
import viewpoint from '../models/MapViewpoint.js';


//module code block ------------------------------------------------------------

const INIT_VIEWPOINT_LAT_LON = {lon:-5, lat:28};
const INIT_SCALE_LEVEL = 2.25;

var { x, y } = latLonToWebMercator(INIT_VIEWPOINT_LAT_LON);
var z = INIT_SCALE_LEVEL;

viewpoint.set(x, y, z);
