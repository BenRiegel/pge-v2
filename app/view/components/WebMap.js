//imports ----------------------------------------------------------------------

import { levelToValue } from '../../lib/web_mapping/WebMapScale.js';
import { latLonToWebMercatorXY } from '../../lib/web_mapping/WebMercator.js';
import WebMap from '../../lib/components/web_map/WebMap.js';
import rootNode from '../nodes/RootNode.js';
import '../stylesheets/web_map.scss';


//module code block ------------------------------------------------------------

var { width, height } = rootNode.getBoundingClientRect();

var config = {
  initCoords: latLonToWebMercatorXY({lon:-5, lat:28}),
  initScale: levelToValue(2),
  mapDimensions: { width, height },
}

var webMap = new WebMap(config);


//exports ----------------------------------------------------------------------

export default webMap;
