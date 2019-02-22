//imports ----------------------------------------------------------------------

import dispatcher from '../services/Dispatcher.js';
import { panStart, panEnd } from '../services/Dispatcher.js';
import mapViewpoint from '../stores/MapViewpoint.js';


//module code block ------------------------------------------------------------

const TOTAL_FADE_FRAMES = 30;
const MAX_FRAME_MOVEMENT = 35;

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
  totalXPx = Math.min(totalXPx, MAX_FRAME_MOVEMENT);
  totalYPx = Math.min(totalYPx, MAX_FRAME_MOVEMENT);
  mouseMoveList = [];
  return {x:totalXPx, y:totalYPx};
}

var calculateCoordChanges = function(location){
  return {
    x: mapViewpoint.getChangeSummary('x', location.x),
    y: mapViewpoint.getChangeSummary('y', location.y),
  }
}

var pan = async function(){
  await new Promise( resolve => {
    requestAnimationFrame( () => {
      var changes = getChanges();
      var deltaXRequest = changes.x * mapViewpoint.scale;
      var deltaYRequest = changes.y * mapViewpoint.scale;
      var newXRequest = mapViewpoint.x + deltaXRequest;
      var newYRequest = mapViewpoint.y + deltaYRequest;
      var worldCoords = {x:newXRequest, y:newYRequest};
      var coordChanges = calculateCoordChanges(worldCoords);
      var newX = mapViewpoint.x + coordChanges.x.delta;
      var newY = mapViewpoint.y + coordChanges.y.delta;
      mapViewpoint.set(newX, newY, mapViewpoint.scale);
      lastMovement = {x:coordChanges.x.delta, y:coordChanges.y.delta};
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
      var deltaXRequest = fadeMovement.x * percentFade;
      var deltaYRequest = fadeMovement.y * percentFade;
      var newXRequest = mapViewpoint.x + deltaXRequest;
      var newYRequest = mapViewpoint.y + deltaYRequest;
      var worldCoords = {x:newXRequest, y:newYRequest};
      var coordChanges = calculateCoordChanges(worldCoords);
      var panX = mapViewpoint.x + coordChanges.x.delta;
      var panY = mapViewpoint.y + coordChanges.y.delta;
      mapViewpoint.set(panX, panY, mapViewpoint.scale);
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
    mapViewpoint.terminateAction();
    panEnd();
  }
}

//load listeners ---------------------------------------------------------------

dispatcher.addListener('panController - panStartRequest', () => {
  buttonIsDown = true;
  if (!panInProgress){
    mapViewpoint.startNewAction('pan');
    panStart();
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
