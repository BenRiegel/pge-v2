//imports ----------------------------------------------------------------------

import { clamp } from '../../../../utils/Utils.js';


//exports ----------------------------------------------------------------------

export default function BasempLayerEmitterController(emitter, view){

  var { nodes } = view;
  var { root } = nodes;

  //define reactions -----------------------------------------------------------

  const TOTAL_FADE_FRAMES = 30;
  const MAX_VELOCITY = 20;

  var currentCoords;
  var prevCoords;
  var cumulativePan;
  var mouseMoveList = [];
  var moveAve;
  var panInProgress = false;
  var buttonIsDown = false;
  var fadeFrameNum = 0;

  var getMoveAve = function(){
    const numFrames = 6;
    var currentEntry = mouseMoveList.pop();
    var thresholdTime = currentEntry.time - 1000/60 * numFrames;
    var sumDeltaX = currentEntry.deltaX;
    var sumDeltaY = currentEntry.deltaY;
    var done = false;
    while (!done){
      var entry = mouseMoveList.pop();
      if (!entry || entry.time < thresholdTime){
        done = true;
      } else {
        sumDeltaX += entry.deltaX;
        sumDeltaY += entry.deltaY;
      }
    }
    var aveDeltaX = clamp(sumDeltaX / numFrames, -MAX_VELOCITY, MAX_VELOCITY);
    var aveDeltaY = clamp(sumDeltaY / numFrames, -MAX_VELOCITY, MAX_VELOCITY);
    return {x: aveDeltaX, y:aveDeltaY};
  };

  var pan = function(){
    requestAnimationFrame( () => {
      var deltaX = currentCoords.x - prevCoords.x;
      var deltaY = currentCoords.y - prevCoords.y;
      deltaX = clamp(deltaX, -MAX_VELOCITY, MAX_VELOCITY);
      deltaY = clamp(deltaY, -MAX_VELOCITY, MAX_VELOCITY);
      cumulativePan.x += deltaX;
      cumulativePan.y += deltaY;
      emitter.notify('pan', cumulativePan);
      prevCoords.x = currentCoords.x;
      prevCoords.y = currentCoords.y;
      cycle();
    });
  };

  var fadePan = function(){
    fadeFrameNum += 1;
    var percentDone = fadeFrameNum / TOTAL_FADE_FRAMES;
    var percentFade = 1 - percentDone;
    requestAnimationFrame( () => {
      if (fadeFrameNum === TOTAL_FADE_FRAMES){
        panInProgress = false;
        fadeFrameNum = 0;
        emitter.notify('panEnd');
      } else {
        cumulativePan.x += moveAve.x * percentFade;
        cumulativePan.y += moveAve.y * percentFade;
        emitter.notify('pan', cumulativePan);
        cycle();
      }
    });
  };

  var cycle = function(){
    if (buttonIsDown){
      pan();
    } else {
      fadePan();
    }
  };

  var onPanStart = function(x, y){
    buttonIsDown = true;
    currentCoords = {x, y};
    prevCoords = {x, y};
    cumulativePan = {x:0, y:0};
    mouseMoveList = [];
    if (!panInProgress){
      panInProgress = true;
      emitter.notify('panStart');
      cycle();
    }
  };

  var onPan = function(x, y){
    var time = new Date().getTime();
    var deltaX = x - currentCoords.x;
    var deltaY = y - currentCoords.y;
    mouseMoveList.push( {time, deltaX, deltaY} );
    currentCoords = {x, y};
  };

  var onPanEnd = function(x, y){
    if (panInProgress){
      var time = new Date().getTime();
      var deltaX = x - currentCoords.x;
      var deltaY = y - currentCoords.y;
      mouseMoveList.push( {time, deltaX, deltaY} );
      buttonIsDown = false;
      moveAve = getMoveAve();
    }
  };

  //load event reactions -------------------------------------------------------

  root.setEventListener('mousedown', onPanStart);
  root.setEventListener('mousemove', onPan);
  root.setEventListener('mouseup', onPanEnd);
  root.setEventListener('mouseout', onPanEnd);

}
