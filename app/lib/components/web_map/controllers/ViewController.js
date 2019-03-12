//imports ----------------------------------------------------------------------

import { latLonToWebMercatorXY } from '../lib/WebMercator.js';

//exports ----------------------------------------------------------------------

export default function WebMapViewController(view){

  var { nodes, subcomponents } = view;
  var { root } = nodes;
  var { zoomControls, popup, graphicsLayer } = subcomponents;

  //configure dom --------------------------------------------------------------

  root.appendChildNode(zoomControls.rootNode);
  root.appendChildNode(popup.rootNode);
  root.appendChildNode(graphicsLayer.rootNode);

  //public api -----------------------------------------------------------------

  this.addGraphicsLocations = function(locations){
    for (var location of locations){
      location.worldCoords = latLonToWebMercatorXY(location.geoCoords);
    }
    graphicsLayer.loadLocations(locations);
  }

}
