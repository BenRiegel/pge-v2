//imports ----------------------------------------------------------------------

import { latLonToWebMercator } from '../models/WebMercator.js';


//module code block ------------------------------------------------------------

const INIT_VIEWPOINT_LAT_LON = {lon:-5, lat:28};
const INIT_VIEWPOINT_WM = latLonToWebMercator(INIT_VIEWPOINT_LAT_LON);
const INIT_SCALE_LEVEL = 2;


//exports ----------------------------------------------------------------------

export const INIT_SELECTED_TAG = "All Sites";
export const INIT_WEB_MAP_XYZ = {x:INIT_VIEWPOINT_WM.x, y:INIT_VIEWPOINT_WM.y, z:INIT_SCALE_LEVEL};
export const FADE_IN_OUT_ANIMATION_TIME = '750ms';
export const EXPAND_IN_OUT_ANIMATION_TIME = '1000ms';
