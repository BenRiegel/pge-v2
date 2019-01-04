//imports ----------------------------------------------------------------------

import dispatcher from '../services/Dispatcher.js';
import { zoomStart, zoomEnd } from '../controllers/DispatcherController.js';
import mapViewpoint from '../stores/MapViewpoint.js';
import { onNewAnimationFrame } from '../../lib/Animation.js';


//module code block ------------------------------------------------------------

const TOTAL_FADE_FRAMES = 20;

var zoomDir = null;
var zoomInProgress = false;
var buttonIsDown = false;
var fadeFrameNum = 0;


var setZoomInProgress = function(newValue){
  var oldValue = zoomInProgress;
  if (oldValue !== newValue){
    if (newValue === true){
      zoomStart();
    } else {
      zoomEnd();
    }
    zoomInProgress = newValue;
  }
}

var zoom = async function(){
  var coordChanges = mapViewpoint.calculateCoordChanges(zoomDir, {percent:1});
  setZoomInProgress(coordChanges.z.hasChanged);
  if (coordChanges.z.hasChanged){
    await updateViewpoint(coordChanges.z.new);
  }
}

var fadeZoom = async function(){
  fadeFrameNum += 1;
  var percentDone = fadeFrameNum / TOTAL_FADE_FRAMES;
  var percentFade = 1 - percentDone;
  var coordChanges = mapViewpoint.calculateCoordChanges(zoomDir, {percent:percentFade});
  setZoomInProgress(coordChanges.z.hasChanged);
  if (coordChanges.z.hasChanged){
    await updateViewpoint(coordChanges.z.new);
  }
  if (fadeFrameNum === TOTAL_FADE_FRAMES){
    setZoomInProgress(false);
  }
}

/*var calculateCoordChanges = function(){
  if (buttonIsDown){
    return mapViewpoint.calculateCoordChanges(zoomDir, {percent:1});
  } else {
    fadeFrameNum += 1;
    var percentDone = fadeFrameNum / TOTAL_FADE_FRAMES;
    var percentFade = 1 - percentDone;
    return mapViewpoint.calculateCoordChanges(zoomDir, {percent:percentFade});
  }
}*/

var updateViewpoint = async function(newZ){
  await onNewAnimationFrame( async () => {
    await mapViewpoint.zoom(newZ);
  });
}

/*var updateZoomInProgress = function(zHasChanged){
  if (!zHasChanged || (fadeFrameNum === TOTAL_FADE_FRAMES && !buttonIsDown)){
    setZoomInProgress(false);
  } else {
    setZoomInProgress(true);
  }
}*/

var cycle = async function(){
  if (buttonIsDown){
    await zoom();
  } else {
    await fadeZoom();
  }
/*  var coordChanges = calculateCoordChanges();
  if (coordChanges.z.hasChanged){
    setZoomInProgress(true);
    await updateViewpoint(coordChanges.z.new);
  }
  updateZoomInProgress(coordChanges.z.hasChanged);*/
  if (zoomInProgress){
    cycle();
  }
}

//load listeners ---------------------------------------------------------------

dispatcher.addListener('zoomController', 'zoomStartRequest', dir => {
  zoomDir = `zoom-${dir}`;
  buttonIsDown = true;
  if (!zoomInProgress){
    cycle();
  }
});

dispatcher.addListener('zoomController', 'zoomStopRequest', () => {
  buttonIsDown = false;
  fadeFrameNum = 0;
});
