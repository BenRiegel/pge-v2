//imports ----------------------------------------------------------------------

import dispatcher from '../services/Dispatcher.js';

//import mapViewpoint from '../stores/MapViewpoint.js';
//import { onNewAnimationFrame } from '../../lib/Animation.js';


//module code block ------------------------------------------------------------

const TOTAL_FADE_FRAMES = 20;

var panInProgress = false;
var buttonIsDown = false;
var fadeFrameNum = 0;


/*var setZoomInProgress = function(newValue){
  var oldValue = zoomInProgress;
  if (oldValue !== newValue){
    if (newValue === true){
      zoomStart();
    } else {
      zoomEnd();
    }
    zoomInProgress = newValue;
  }
}*/


var pan = async function(){
  await new Promise( resolve => {
    requestAnimationFrame( () => {
      resolve();
    });
  });
}

var fadePan = async function(){
  await new Promise( resolve => {
    requestAnimationFrame( () => {
      resolve();
    });
  });
}


/*var zoom = async function(){
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
}*/

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
  console.log('cycling', buttonIsDown);
  if (buttonIsDown){
    panInProgress = true;
    await pan();
  } else {
    panInProgress = false;
    await fadePan();
  }
  if (panInProgress){
    cycle();
  }
}

//load listeners ---------------------------------------------------------------

dispatcher.addListener('panController', 'panStartRequest', () => {
  buttonIsDown = true;
  if (!panInProgress){
    cycle();
  }
});

dispatcher.addListener('panController', 'panEndRequest', () => {
  buttonIsDown = false;
  panInProgress = false;
  console.log('end request');
//  fadeFrameNum = 0;
});

dispatcher.addListener('panController', 'panRequest', deltaPx => {
  //console.log(deltaPx);
});
