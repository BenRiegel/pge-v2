//imports ----------------------------------------------------------------------

import Coord from '../../lib/Coord.js';
import { levelToValue, valueToLevel } from '../../../../web_mapping/WebMapScale.js';
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
  get canAnimateHome(){
    var zoomLevelDiff = Math.log2(this.previousValue / this.value);
    return (zoomLevelDiff > -2);
  }
  get level(){
    return valueToLevel(this.value);
  }
}
