//imports ----------------------------------------------------------------------

import dispatcher from '../services/Dispatcher.js';
import mapViewpoint from '../stores/MapViewpoint.js';
import { getNextAnimationFrame } from '../../lib/Animation.js';


//module code block ------------------------------------------------------------

var isCycling = false;
var zoomDir = null;

var zoomAction = function(){
  var coordChanges = mapViewpoint.calculateCoordChanges(zoomDir);
  if (coordChanges.z.hasChanged){
    mapViewpoint.setCoords(mapViewpoint.coords.x, mapViewpoint.coords.y, coordChanges.z.new);
  }
}

var cycle = async function(){
  await getNextAnimationFrame();
  zoomAction();
  if (isCycling){
    cycle();
  }
}

//load listeners ---------------------------------------------------------------

dispatcher.addListener('zoomController', 'zoomStartRequest', dir => {
  zoomDir = `zoom-${dir}`;
  if (!isCycling){
    isCycling = true;
    cycle();
  }
});

dispatcher.addListener('zoomController', 'zoomStopRequest', () => {
  isCycling = false;
});
