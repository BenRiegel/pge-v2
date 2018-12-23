//imports ----------------------------------------------------------------------

import { clamp } from '../../lib/Utils.js';


//module code block ------------------------------------------------------------

const MIN_SCALE_LEVEL = 2;

const MAX_SCALE_LEVEL = 12;


//exports ----------------------------------------------------------------------

export function calculateNewZ(z){
  return clamp(z, MIN_SCALE_LEVEL, MAX_SCALE_LEVEL);
}
