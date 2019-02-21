//imports ----------------------------------------------------------------------

import ViewpointState from '../lib/ViewpointState.js';
import { INIT_COORDS_WM, INIT_SCALE } from '../config/Config.js';


//module code block ------------------------------------------------------------

var mapViewpoint = new ViewpointState({
  x: INIT_COORDS_WM.x,
  y: INIT_COORDS_WM.y,
  scale: INIT_SCALE,
  action: null,
});


//exports ----------------------------------------------------------------------

export default mapViewpoint;
