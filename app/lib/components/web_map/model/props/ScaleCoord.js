//imports ----------------------------------------------------------------------

import Coord from '../../lib/Coord.js';
import { levelToValue } from '../../../../web_mapping/WebMapScale.js';
import { clamp } from '../../../../utils/Utils.js';


//module code block ------------------------------------------------------------

const MIN_VIEWPOINT_SCALE_LEVEL = 2;
const MAX_VIEWPOINT_SCALE_LEVEL = 12;
const MAX_VIEWPOINT_SCALE = levelToValue(MIN_VIEWPOINT_SCALE_LEVEL);
const MIN_VIEWPOINT_SCALE = levelToValue(MAX_VIEWPOINT_SCALE_LEVEL);

//exports ----------------------------------------------------------------------

export default class Scale extends Coord{
  constructor(initValue){
    super(initValue);
  }
  rectifyNewValue(newValue){
    return clamp(newValue, MIN_VIEWPOINT_SCALE, MAX_VIEWPOINT_SCALE);
  }
  getChangeSummary(newValue){
    var initValue = this.value;
    var newValueRectified = this.rectifyNewValue(newValue);
    var deltaValue = this.calculateDeltaValue(newValueRectified, initValue);
    var hasChanged = Boolean(deltaValue);
    var zoomLevelDiff = Math.log2(initValue / newValueRectified);
    var canZoomHome = (zoomLevelDiff > -2);
    return { initValue, newValueRectified, deltaValue, hasChanged, canZoomHome };
  }
}
