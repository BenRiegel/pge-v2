//imports ----------------------------------------------------------------------

import dispatcher from '../services/Dispatcher.js';
import mapViewpoint from '../stores/MapViewpoint.js';
import { easeInOut } from '../lib/Utils.js';
import { INIT_COORDS_WM, INIT_SCALE } from '../config/Config.js';


//module code block ------------------------------------------------------------

const ZOOM_IN_SCALER = 0.5;
const ZOOM_OUT_SCALER = 2;


var getFramesInfo = function(numFrames, initValue, deltaValue){
  var frames = [];
  for (var i = 0; i < numFrames; i++){
    var percent = easeInOut(i+1, numFrames);
    frames[i] = initValue + percent * deltaValue;
  }
  return frames;
}


var calculateNumFrames = function( {x, y, scale} ){
  if (scale.hasChanged){
    return 40;
  }
  if (!x.hasChanged && !y.hasChanged){
    return 0;
  } else {
    var deltaXPx = Math.abs(x.delta / mapViewpoint.scale);
    var deltaYPx = Math.abs(y.delta / mapViewpoint.scale);
    var distancePx = Math.sqrt(deltaXPx * deltaXPx + deltaYPx * deltaYPx);
    var numFrames = Math.ceil(distancePx / 6);
    numFrames = Math.max(15, numFrames);
    return numFrames;
  }
}


var calculateCoordChanges = function(moveType, location){
  switch (moveType){
    case 'zoomIn':
      var newX = mapViewpoint.x;
      var newY = mapViewpoint.y;
      var newScale = mapViewpoint.scale * ZOOM_IN_SCALER;
      break;
    case 'zoomOut':
      var newX = mapViewpoint.x;
      var newY = mapViewpoint.y;
      var newScale = mapViewpoint.scale * ZOOM_OUT_SCALER;
      break;
    case 'zoomHome':
      var newX = INIT_COORDS_WM.x;
      var newY = INIT_COORDS_WM.y;
      var newScale = INIT_SCALE;
      break;
    case 'panTo':
      var newX = location.x;
      var newY = location.y;
      var newScale = mapViewpoint.scale;
      break;
    case 'zoomTo':
      var newX = location.x;
      var newY = location.y;
      var newScale = mapViewpoint.scale * ZOOM_IN_SCALER;
      break;
    default:
      break;
  }
  return {
    x: mapViewpoint.getChangeSummary('x', newX),
    y: mapViewpoint.getChangeSummary('y', newY),
    scale: mapViewpoint.getChangeSummary('scale', newScale),
  }
}





var move = async function(requestedMoveType, worldCoords){

  var changeSummary = calculateCoordChanges(requestedMoveType, worldCoords);

  if (requestedMoveType === 'zoomHome'){
    var deltaScaleLevel = Math.abs(changeSummary.scale.deltaLevel);
    if (deltaScaleLevel > 1){
      await mapViewpoint.startNewAction('zoomHome');
      var newX = changeSummary.x.new;
      var newY = changeSummary.y.new;
      var newScale = changeSummary.scale.new;
      await mapViewpoint.set(newX, newY, newScale);
      await mapViewpoint.terminateAction();
      return;
    }
  }

  var numFrames = calculateNumFrames(changeSummary);
  if (numFrames === 0){
    return;
  }
  var moveType = changeSummary.scale.hasChanged ? 'zoom' : 'pan';

  var differences = [];
  var previousTime = new Date().getTime();

  mapViewpoint.startNewAction(moveType);

  await new Promise(resolve => {
    var frameNum = 0;
    var addNewFrame = function(){
      frameNum += 1;
      requestAnimationFrame( () => {
        var percent = easeInOut(frameNum, numFrames);
        var newX = changeSummary.x.init + percent * changeSummary.x.delta;
        var newY = changeSummary.y.init + percent * changeSummary.y.delta;
        var newScale = changeSummary.scale.init + percent * changeSummary.scale.delta;

        mapViewpoint.set(newX, newY, newScale);

        var newTime = new Date().getTime();
        differences.push(newTime - previousTime);
        previousTime = newTime;
        if (frameNum < numFrames){
          addNewFrame();
        } else {
          resolve();
        }
      });
    }
    addNewFrame();
  });

  await mapViewpoint.terminateAction();
  console.log(differences);
}









//load listeners ---------------------------------------------------------------

dispatcher.addListener('mapMoveAnimator - panTo', async worldCoords => {
  await move('panTo', worldCoords);
});

dispatcher.addListener('mapMoveAnimator - zoom', async (type, worldCoords) => {
  //var zoomType = 'zoom' + capitalizeString(type);
  await move(type, worldCoords);
});