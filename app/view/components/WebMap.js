//imports ----------------------------------------------------------------------

import { levelToValue } from '../../lib/web_mapping/WebMapScale.js';
import { latLonToWebMercatorXY } from '../../lib/web_mapping/WebMercator.js';
import WebMap from '../../lib/components/web_map/WebMap.js';
import popupTemplate from './PopupTemplate.js';
import '../stylesheets/web_map.scss';


//module code block ------------------------------------------------------------

var config = {
  rootNodeId: 'webmap',
  initCoords: latLonToWebMercatorXY({lon:-5, lat:28}),
  initScale: levelToValue(2),
  popupTemplate,
};

var webMap = new WebMap(config);


//exports ----------------------------------------------------------------------

export default webMap;
