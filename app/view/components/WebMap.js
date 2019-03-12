//imports ----------------------------------------------------------------------

import WebMap from '../../lib/components/web_map/WebMap.js';
import rootNode from '../nodes/RootNode.js';
import '../stylesheets/web_map.scss';


//module code block ------------------------------------------------------------

var props = {
  initCoords: {lon:-5, lat:28},
  initScaleLevel: 2,
  mapDimensions: rootNode.getBoundingClientRect(),
}

var webMap = new WebMap(props);


//exports ----------------------------------------------------------------------

export default webMap;
