//imports ----------------------------------------------------------------------

import dispatcher from '../services/Dispatcher.js';
import mapViewpoint from '../stores/MapViewpoint.js';
import mapProperties from '../stores/MapProperties.js';
import { getScale, calculateScaleLevel } from '../../lib/WebMapScale.js';
import { onNewAnimationFrame } from '../../lib/Animation.js';
import { capitalizeString } from '../../lib/Utils.js';


//module code block ------------------------------------------------------------

var getPanToAnimationTime = function(deltaX, deltaY){
  if (deltaX === 0 && deltaY === 0){
    return 0;
  }
  var deltaXPx = deltaX / mapProperties.pixelSize;
  var deltaYPx = deltaY / mapProperties.pixelSize;
  var maxDelta = Math.max( Math.abs(deltaXPx), Math.abs(deltaYPx) );
  var numFrames = Math.ceil(maxDelta / 6);
  return Math.max(20, numFrames);
}

var getZoomAnimationTime = function(deltaZ){
  return 40 * Math.abs(deltaZ);
}

var easeInOutQuad = function(t,b,c,d){
  t /= d/2;
	if (t < 1) return c/2*t*t + b;
	t--;
	return -c/2 * (t*(t-2) - 1) + b;
}


var panTo = async function(worldCoords){
  var coordChanges = mapViewpoint.calculateCoordChanges('panTo', worldCoords);
  var numFrames = getPanToAnimationTime(coordChanges.x.delta, coordChanges.y.delta);
  if (numFrames === 0){
    return;
  }

  var prevX = coordChanges.x.init;
  var prevY = coordChanges.y.init;

  //var differences = [];
  //var previousTime = new Date().getTime();

  for (var i = 0; i < numFrames; i++){
    var newX = easeInOutQuad(i+1, coordChanges.x.init, coordChanges.x.delta, numFrames);
    var newY = easeInOutQuad(i+1, coordChanges.y.init, coordChanges.y.delta, numFrames);
    var deltaXPx = (newX - prevX) / mapProperties.pixelSize;
    var deltaYPx = (newY - prevY) / mapProperties.pixelSize;
    //var newX = mapViewpoint.coords.x + deltaXFrame;
    //var newY = mapViewpoint.coords.y + deltaYFrame;

    await onNewAnimationFrame( async () => {
    //  var newTime = new Date().getTime();
    //  differences.push(newTime - previousTime);
      //previousTime = newTime;
      await mapViewpoint.pan(newX, newY, deltaXPx, deltaYPx);
    });

    prevX = newX;
    prevY = newY;
  }
  //console.log(differences);
}


var zoom = async function(type, worldCoords){
  var zoomType = 'zoom' + capitalizeString(type);
  var coordChanges = mapViewpoint.calculateCoordChanges(zoomType, worldCoords);
  if (coordChanges.z.hasChanged){
    var numFrames = getZoomAnimationTime(coordChanges.z.delta);
  } else {
    var numFrames = getPanToAnimationTime(coordChanges.x.delta, coordChanges.y.delta);
  }
  if (numFrames === 0){
    return;
  }

  var initScale = getScale(coordChanges.z.init);
  var endScale = getScale(coordChanges.z.new);
  var deltaScale = endScale - initScale;

  mapViewpoint.setEventStartZ();

  for (var i = 0; i < numFrames; i++){
    var newX = easeInOutQuad(i+1, coordChanges.x.init, coordChanges.x.delta, numFrames);
    var newY = easeInOutQuad(i+1, coordChanges.y.init, coordChanges.y.delta, numFrames);
    var newScale = easeInOutQuad(i+1, initScale, deltaScale, numFrames);
    var newZLevel = calculateScaleLevel(newScale);

    await onNewAnimationFrame( async () => {
      await mapViewpoint.panAndZoom(newX, newY, newZLevel);
    });
  }

}

dispatcher.addListener('mapMoveAnimator', 'panTo', async worldCoords => {
  await panTo(worldCoords);
});

dispatcher.addListener('mapMoveAnimator', 'zoom', async (type, worldCoords) => {
  await zoom(type, worldCoords);
});





/*var easeInOutQuad = function (t){
  return t<.5 ? 2*t*t : -1+(4-2*t)*t;
};*/


/*var zoomTo = async function(worldCoords){
  var coordChanges = mapViewpoint.calculateCoordChanges('zoomTo', worldCoords);


  var numFrames = 60;

  var deltaXFrame = coordChanges.x.delta / numFrames;
  var deltaYFrame = coordChanges.y.delta / numFrames;

  var initScale = getScale(coordChanges.z.init);
  var endScale = getScale(coordChanges.z.new);
  var deltaScale = endScale - initScale;
  var deltaScaleFrame = deltaScale / numFrames;

  var differences = [];
  var previousTime = new Date().getTime();

  for (var i = 0; i < numFrames; i++){
    var newX = mapViewpoint.coords.x + deltaXFrame;
    var newY = mapViewpoint.coords.y + deltaYFrame;
    var currentZ = getScale(mapViewpoint.coords.z);
    var newZ = calculateScaleLevel(currentZ + deltaScaleFrame);

    await onNewAnimationFrame( async () => {
      var newTime = new Date().getTime();
      differences.push(newTime - previousTime);
      previousTime = newTime;
      await mapViewpoint.panAndZoom(newX, newY, newZ);
    });
  }
  //console.log(differences);
}

var zoom = async function(zoomType){
  var coordChanges = mapViewpoint.calculateCoordChanges(zoomType);

  var numFrames = 30;
  var initScale = getScale(coordChanges.z.init);
  var endScale = getScale(coordChanges.z.new);
  var deltaScale = endScale - initScale;
  var deltaScaleFrame = deltaScale / numFrames;

  var differences = [];
  var previousTime = new Date().getTime();

  for (var i = 0; i < numFrames; i++){
    var currentZ = getScale(mapViewpoint.coords.z);
    var newScale = easeInOutQuad(i+1, initScale, deltaScale, numFrames);
     //var newZ = calculateScaleLevel(currentZ + deltaScaleFrame);
    var newZ = calculateScaleLevel(newScale);

    await onNewAnimationFrame( async () => {
      var newTime = new Date().getTime();
      differences.push(newTime - previousTime);
      previousTime = newTime;
      await mapViewpoint.zoom(newZ);
    });
  }
  //console.log(differences);
}*/

/*var zoomHome = async function(){
  var coordChanges = mapViewpoint.calculateCoordChanges('zoomHome');

  var numFrames = 120;

  var deltaXFrame = coordChanges.x.delta / numFrames;
  var deltaYFrame = coordChanges.y.delta / numFrames;

  var initScale = getScale(coordChanges.z.init);
  var endScale = getScale(coordChanges.z.new);
  var deltaScale = endScale - initScale;
  var deltaScaleFrame = deltaScale / numFrames;

  var differences = [];
  var previousTime = new Date().getTime();

  for (var i = 0; i < numFrames; i++){
    var newX = mapViewpoint.coords.x + deltaXFrame;
    var newY = mapViewpoint.coords.y + deltaYFrame;
    var currentZ = getScale(mapViewpoint.coords.z);
    var newZ = calculateScaleLevel(currentZ + deltaScaleFrame);
    await onNewAnimationFrame( async () => {
      var newTime = new Date().getTime();
      differences.push(newTime - previousTime);
      previousTime = newTime;
      await mapViewpoint.panAndZoom(newX, newY, newZ);
    });
  }
//  console.log(differences);
}
*/
