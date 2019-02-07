//imports ----------------------------------------------------------------------

import dispatcher from '../services/Dispatcher.js';
import mapViewpoint from '../stores/MapViewpoint.js';
import mapProperties from '../stores/MapProperties.js';


//module code block ------------------------------------------------------------

const TOTAL_FADE_FRAMES = 40;

var mouseMoveList = [];
var panInProgress = false;
var buttonIsDown = false;
var fadeFrameNum = 0;
var lastMovement = 0;
var fadeMovement = 0;

var getChanges = function(){
  var totalXPx= 0;
  var totalYPx = 0;
  for (var mouseMove of mouseMoveList){
    totalXPx += mouseMove.x;
    totalYPx += mouseMove.y;
  }
  totalXPx = Math.min(totalXPx, 30);
  totalYPx = Math.min(totalYPx, 30);
  mouseMoveList = [];
  return {x:totalXPx, y:totalYPx};
}

var pan = async function(){
  await new Promise( resolve => {
    requestAnimationFrame( () => {
      var changes = getChanges();
      var deltaX = changes.x * mapProperties.pixelSize;
      var deltaY = changes.y * mapProperties.pixelSize;
      var newX = mapViewpoint.coords.x + deltaX;
      var newY = mapViewpoint.coords.y + deltaY;
      var worldCoords = {x:newX, y:newY};
      var coordChanges = mapViewpoint.calculateCoordChanges('panTo', worldCoords);
      var panDeltaX = coordChanges.x.delta / mapProperties.pixelSize;
      var panDeltaY = coordChanges.y.delta / mapProperties.pixelSize;
      var panX = mapViewpoint.coords.x + coordChanges.x.delta;
      var panY = mapViewpoint.coords.y + coordChanges.y.delta;
      mapViewpoint.pan(panX, panY, panDeltaX, panDeltaY);
      lastMovement = {x:panDeltaX, y:panDeltaY};
      resolve();
    });
  });
}

var fadePan = async function(){
  fadeFrameNum += 1;
  var percentDone = fadeFrameNum / TOTAL_FADE_FRAMES;
  var percentFade = 1 - percentDone;
  await new Promise( resolve => {
    requestAnimationFrame( () => {
    //  console.log(fadeFrameNum, lastMovement)
      var deltaXPx = fadeMovement.x * percentFade;
      var deltaYPx = fadeMovement.y * percentFade;
      var newX = mapViewpoint.coords.x + deltaXPx * mapProperties.pixelSize;
      var newY = mapViewpoint.coords.y + deltaYPx * mapProperties.pixelSize;
      var worldCoords = {x:newX, y:newY};
      var coordChanges = mapViewpoint.calculateCoordChanges('panTo', worldCoords);
      var panDeltaX = coordChanges.x.delta / mapProperties.pixelSize;
      var panDeltaY = coordChanges.y.delta / mapProperties.pixelSize;
      var panX = mapViewpoint.coords.x + coordChanges.x.delta;
      var panY = mapViewpoint.coords.y + coordChanges.y.delta;
      mapViewpoint.pan(panX, panY, panDeltaX, panDeltaY);
      resolve();
    });
  });
  if (fadeFrameNum === TOTAL_FADE_FRAMES){
    panInProgress = false;
  }
}

var cycle = async function(){
  if (buttonIsDown){
    panInProgress = true;
    await pan();
  } else {
    await fadePan();
  }
  if (panInProgress){
    cycle();
  } else {
    mapViewpoint.endMovement();
  }
}

//load listeners ---------------------------------------------------------------

dispatcher.addListener('panController - panStartRequest', () => {
  buttonIsDown = true;
  if (!panInProgress){
    mapViewpoint.startMovement('pan');
    cycle();
  }
});

dispatcher.addListener('panController - panEndRequest', () => {
  buttonIsDown = false;
  fadeFrameNum = 0;
  fadeMovement = lastMovement;
});

dispatcher.addListener('panController - panRequest', deltaPx => {
  mouseMoveList.push(deltaPx);
});
