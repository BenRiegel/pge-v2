//exports ----------------------------------------------------------------------

import { latLonToWebMercator } from '../lib/WebMercator.js';
import { levelToValue } from '../lib/WebMapScale.js';


//module code block ------------------------------------------------------------

const INIT_SELECTED_TAG = "All Sites";
const INIT_COORDS_LAT_LON = {lon:-5, lat:28};
const INIT_SCALE_LEVEL = 2;


//exports ----------------------------------------------------------------------

export { INIT_SELECTED_TAG };
export const INIT_COORDS_WM = latLonToWebMercator(INIT_COORDS_LAT_LON);
export const INIT_SCALE = levelToValue(INIT_SCALE_LEVEL);
