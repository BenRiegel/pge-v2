//imports ----------------------------------------------------------------------

import dispatcher from '../services/Dispatcher.js';
import mapViewpoint from '../stores/MapViewpoint.js';
import mapProperties from '../stores/MapProperties.js';
import { getScale, calculateScaleLevel } from '../../lib/WebMapScale.js';
import { onNewAnimationFrame } from '../../lib/Animation.js';


//module code block ------------------------------------------------------------

var getPanToAnimationTime = function(deltaXPx, deltaYPx){
  var maxDelta = Math.max( Math.abs(deltaXPx), Math.abs(deltaYPx) );
  var numFrames = Math.ceil(maxDelta / 6);
  return Math.max(10, numFrames);
}


var easeInOutQuad = function(t,b,c,d){
  t /= d/2;
	if (t < 1) return c/2*t*t + b;
	t--;
	return -c/2 * (t*(t-2) - 1) + b;
}

//var easeInOutQuad = function (t){
//  return t<.5 ? 2*t*t : -1+(4-2*t)*t;
//};



var panTo = async function(worldCoords){
  var coordChanges = mapViewpoint.calculateCoordChanges('panTo', worldCoords);
  if (!coordChanges.x.hasChanged && !coordChanges.y.hasChanged){
    return;
  }
  var deltaXPxTotal = coordChanges.x.delta / mapProperties.pixelSize;
  var deltaYPxTotal = coordChanges.y.delta / mapProperties.pixelSize;
  var numFrames = getPanToAnimationTime(deltaXPxTotal, deltaYPxTotal);

  var deltaXFrame = coordChanges.x.delta / numFrames;
  var deltaXPxFrame = deltaXPxTotal / numFrames;
  var deltaYFrame = coordChanges.y.delta / numFrames;
  var deltaYPxFrame = deltaYPxTotal / numFrames;

  var differences = [];
  var previousTime = new Date().getTime();

  for (var i = 0; i < numFrames; i++){
    var newX = mapViewpoint.coords.x + deltaXFrame;
    var newY = mapViewpoint.coords.y + deltaYFrame;
    await onNewAnimationFrame( async () => {
      var newTime = new Date().getTime();
      differences.push(newTime - previousTime);
      previousTime = newTime;
      await mapViewpoint.pan(newX, newY, deltaXPxFrame, deltaYPxFrame);
    });
  }
  console.log(differences);
}

var zoomTo = async function(worldCoords){
  var coordChanges = mapViewpoint.calculateCoordChanges('zoomTo', worldCoords);

  /*var deltaXPxTotal = coordChanges.x.delta / mapProperties.pixelSize;
  var deltaYPxTotal = coordChanges.y.delta / mapProperties.pixelSize;
  var numFrames = getPanToAnimationTime(deltaXPxTotal, deltaYPxTotal);*/

  var numFrames = 50;

  var deltaXFrame = coordChanges.x.delta / numFrames;
  var deltaYFrame = coordChanges.y.delta / numFrames;

  var initScale = getScale(coordChanges.z.init);
  var endScale = getScale(coordChanges.z.new);
  var deltaScale = endScale - initScale;
  var deltaScaleFrame = deltaScale / numFrames;
  console.log(initScale, endScale, deltaScale, deltaScaleFrame);

  var differences = [];
  var previousTime = new Date().getTime();

  for (var i = 0; i < numFrames; i++){
    var newX = mapViewpoint.coords.x + deltaXFrame;
    var newY = mapViewpoint.coords.y + deltaYFrame;
    var currentZ = getScale(mapViewpoint.coords.z);
    var newZ = calculateScaleLevel(currentZ + deltaScaleFrame);
//    var newZ = Math.log2(currentZ + deltaScaleFrame);
    console.log(newZ);

    await onNewAnimationFrame( async () => {
      var newTime = new Date().getTime();
      differences.push(newTime - previousTime);
      previousTime = newTime;
      await mapViewpoint.panAndZoom(newX, newY, newZ);
    });
  }
  console.log(differences);
}


var zoomHome = async function(){
  var coordChanges = mapViewpoint.calculateCoordChanges('zoomHome');

  /*var deltaXPxTotal = coordChanges.x.delta / mapProperties.pixelSize;
  var deltaYPxTotal = coordChanges.y.delta / mapProperties.pixelSize;
  var numFrames = getPanToAnimationTime(deltaXPxTotal, deltaYPxTotal);*/
  var numFrames = 50;

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
  console.log(differences);
}

dispatcher.addListener('mapMoveAnimator', 'panTo', async worldCoords =>{
  await panTo(worldCoords);
});

dispatcher.addListener('mapMoveAnimator', 'zoomTo', async worldCoords =>{
  await zoomTo(worldCoords);
});

dispatcher.addListener('mapMoveAnimator', 'zoomHome', async () => {
  await zoomHome();
});





/*for (var i = 0; i < numFrames; i++){
  var newX = mapViewpoint.coords.x + coordChanges.x.delta * 1/numFrames;
  var newY = mapViewpoint.coords.y + coordChanges.y.delta * 1/numFrames;
  var newZ = mapViewpoint.coords.z;
  await onNewAnimationFrame( () => {
    mapViewpoint.setCoords(newX, newY, newZ);
  });
}*/

//var percentDone = easeInOutQuad(i/numFrames);
//var newX = easeInOutQuad(i, initX, coordChanges.x.delta, numFrames);
//var newY = easeInOutQuad(i, initY, coordChanges.y.delta, numFrames);
//  var newX = initX + coordChanges.x.delta * percentDone;
//var newY = initY + coordChanges.y.delta * percentDone;
