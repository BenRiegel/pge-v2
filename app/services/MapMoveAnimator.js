//imports ----------------------------------------------------------------------

import dispatcher from '../services/Dispatcher.js';
import mapViewpoint from '../stores/MapViewpoint.js';
import mapProperties from '../stores/MapProperties.js';
import { getNextAnimationFrame } from '../../lib/Animation.js';


//module code block ------------------------------------------------------------

var getPanToAnimationTime = function(deltaXPx, deltaYPx){
  var maxDelta = Math.max( Math.abs(deltaXPx), Math.abs(deltaYPx) );
  var numFrames = Math.ceil(maxDelta / 8);
  return Math.max(10, numFrames);
}


var panTo = async function(worldCoords){
  var coordChanges = mapViewpoint.calculateCoordChanges('panTo', worldCoords);
  if (!coordChanges.x.hasChanged && !coordChanges.y.hasChanged){
    return;
  }
  var deltaXPx = coordChanges.x.delta / mapProperties.pixelSize;
  var deltaYPx = coordChanges.y.delta / mapProperties.pixelSize;
  var numFrames = getPanToAnimationTime(deltaXPx, deltaYPx);

  for (var i = 0; i < numFrames; i++){
    var newX = mapViewpoint.coords.x + coordChanges.x.delta * 1/numFrames;
    var newY = mapViewpoint.coords.y + coordChanges.y.delta * 1/numFrames;
    var newZ = mapViewpoint.coords.z;
    await getNextAnimationFrame();
    await mapViewpoint.setCoords(newX, newY, newZ);
  }
}


dispatcher.addListener('mapMoveAnimator', 'panTo', async worldCoords =>{
  await panTo(worldCoords);
});
