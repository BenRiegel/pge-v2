//imports ----------------------------------------------------------------------

import Coord from '../../lib/Coord.js';
import { rectifyYCoord } from '../../../../web_mapping/WebMercator.js';


//module code block ------------------------------------------------------------

export default class YCoord extends Coord{
  constructor(initValue){
    super(initValue);
  }
  rectifyNewValue(newValue){
    return rectifyYCoord(newValue);
  }
}
