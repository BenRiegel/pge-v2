//imports ----------------------------------------------------------------------

import Coord from '../../lib/Coord.js';
import { calculateDeltaX, rectifyXCoord } from '../../../../web_mapping/WebMercator.js';


//exports ----------------------------------------------------------------------

export default class XCoord extends Coord{
  constructor(initValue){
    super(initValue);
  }
  calculateDeltaValue(value2, value1){
    return calculateDeltaX(value2, value1);
  }
  rectifyNewValue(newValue){
    return rectifyXCoord(newValue);
  }
}
