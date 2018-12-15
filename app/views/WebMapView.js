//imports ----------------------------------------------------------------------

import { rootNodeDimensionsPx } from './RootView.js';


//module code block ------------------------------------------------------------

var webMap = NewWebMap({
  rootNodeDimensionsPx,
  initViewPoint: {lon:-5, lat:28},
  initScaleLevel: 2.25,
});


//exports ----------------------------------------------------------------------

export default webMap;
