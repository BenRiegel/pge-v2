//imports ----------------------------------------------------------------------

import dispatcher from '../services/Dispatcher.js';
import mapViewpoint from '../stores/MapViewpoint.js';
import mapProperties from '../stores/MapProperties.js';
import { getScale, calculateScaleLevel } from '../../lib/WebMapScale.js';
import { onNewAnimationFrame } from '../../lib/Animation.js';
import { capitalizeString, getDistance } from '../../lib/Utils.js';


//module code block ------------------------------------------------------------

var easeInOutQuad = function(t,b,c,d){
  t /= d/2;
	if (t < 1) return c/2*t*t + b;
	t--;
	return -c/2 * (t*(t-2) - 1) + b;
}

var getPanToAnimationTime = function(deltaX, deltaY){
  if (deltaX === 0 && deltaY === 0){
    return 0;
  }
  var deltaXPx = Math.abs(deltaX / mapProperties.pixelSize);
  var deltaYPx = Math.abs(deltaY / mapProperties.pixelSize);
  var distancePx = Math.sqrt(deltaXPx * deltaXPx + deltaYPx * deltaYPx);
  var numFrames = Math.ceil(distancePx / 6);
  numFrames = Math.max(15, numFrames);
  return numFrames;
}

var getZoomAnimationTime = function(deltaZ){
  return 40 * Math.abs(deltaZ);
}

var panTo = async function(worldCoords){
  var coordChanges = mapViewpoint.calculateCoordChanges('panTo', worldCoords);
  var numFrames = getPanToAnimationTime(coordChanges.x.delta, coordChanges.y.delta);
  if (numFrames === 0){
    return;
  }
  var prevX = coordChanges.x.init;
  var prevY = coordChanges.y.init;

  var differences = [];
  var previousTime = new Date().getTime();

  mapViewpoint.startMovement('pan');
  for (var i = 0; i < numFrames; i++){
    await new Promise( resolve => {
      requestAnimationFrame( () => {
        var newX = easeInOutQuad(i+1, coordChanges.x.init, coordChanges.x.delta, numFrames);
        var newY = easeInOutQuad(i+1, coordChanges.y.init, coordChanges.y.delta, numFrames);
        var deltaXPx = (newX - prevX) / mapProperties.pixelSize;
        var deltaYPx = (newY - prevY) / mapProperties.pixelSize;

        mapViewpoint.pan(newX, newY, deltaXPx, deltaYPx);

        var newTime = new Date().getTime();
        differences.push(newTime - previousTime);
        previousTime = newTime;

        prevX = newX;
        prevY = newY;
        resolve();
      });
    });
  }
  await mapViewpoint.endMovement();
  console.log(differences);
}




var zoom = async function(type, worldCoords){
  var zoomType = 'zoom' + capitalizeString(type);
  var coordChanges = mapViewpoint.calculateCoordChanges(zoomType, worldCoords);
  if (coordChanges.z.hasChanged){
    var numFrames = getZoomAnimationTime(coordChanges.z.delta);
    if (zoomType === 'zoomHome'){
      if (!mapViewpoint.canZoomHome)
      await mapViewpoint.setHome();
      return;
    }
  } else {
    var numFrames = getPanToAnimationTime(coordChanges.x.delta, coordChanges.y.delta);
  }
  if (numFrames === 0){
    return;
  }

  var initScale = getScale(coordChanges.z.init);
  var endScale = getScale(coordChanges.z.new);
  var deltaScale = endScale - initScale;

  var differences = [];
  var previousTime = new Date().getTime();

  mapViewpoint.startMovement('zoom');
  for (var i = 0; i < numFrames; i++){
    await new Promise( resolve => {
      requestAnimationFrame( () => {
        var newX = easeInOutQuad(i+1, coordChanges.x.init, coordChanges.x.delta, numFrames);
        var newY = easeInOutQuad(i+1, coordChanges.y.init, coordChanges.y.delta, numFrames);
        var newZ = easeInOutQuad(i+1, initScale, deltaScale, numFrames);
        var newZLevel = calculateScaleLevel(newZ);

        mapViewpoint.panAndZoom(newX, newY, newZLevel);
        var newTime = new Date().getTime();
        differences.push(newTime - previousTime);
        previousTime = newTime;
        resolve();
      });
    });
  }
  await mapViewpoint.endMovement();
  console.log(differences);
}


//load listeners ---------------------------------------------------------------

dispatcher.addListener('mapMoveAnimator', 'panTo', async worldCoords => {
  await panTo(worldCoords);
});

dispatcher.addListener('mapMoveAnimator', 'zoom', async (type, worldCoords) => {
  await zoom(type, worldCoords);
});
