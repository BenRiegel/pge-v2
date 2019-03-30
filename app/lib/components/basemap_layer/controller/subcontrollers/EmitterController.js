//imports ----------------------------------------------------------------------

import { clamp } from '../../../../utils/Utils.js';



//exports ----------------------------------------------------------------------

export default function BasempLayerEmitterController(emitter, dispatcher){

  //define reactions -----------------------------------------------------------

  const TOTAL_FADE_FRAMES = 30;
  const MAX_VELOCITY = 20;

  var initCoords;
  var currentCoords;
  var mouseMoveList = [];
  var panInProgress = false;
  var buttonIsDown = false;
  var fadeFrameNum = 0;
  var moveAve;


  var getMoveAve = function(){
    const numFrames = 6;
    var currentEntry = mouseMoveList.pop();
    var thresholdTime = currentEntry.time - 1000/60*numFrames;
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
  }

  var pan = function(){
    requestAnimationFrame( () => {
      var changes = {
        x: -(currentCoords.x - initCoords.x),
        y: -(currentCoords.y - initCoords.y),
      };
      emitter.notify('pan', changes);
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
        currentCoords.x += moveAve.x * percentFade;
        currentCoords.y += moveAve.y * percentFade;
        var changes = {
          x: -(currentCoords.x - initCoords.x),
          y: -(currentCoords.y - initCoords.y),
        };
        emitter.notify('pan', changes);
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

  var onMouseDown = function(x, y){
    buttonIsDown = true;
    initCoords = {x, y};
    currentCoords = {x, y};
    mouseMoveList = [];
    if (!panInProgress){
      panInProgress = true;
      emitter.notify('panStart');
      cycle();
    }
  };

  var onMouseMove = function(x, y){
    var time = new Date().getTime();
    var deltaX = x - currentCoords.x;
    var deltaY = y - currentCoords.y;
    mouseMoveList.push( {time, deltaX, deltaY} );
    currentCoords = {x, y};
  };

  var onMouseUp = function(x, y){
    if (panInProgress){
      var time = new Date().getTime();
      var deltaX = x - currentCoords.x;
      var deltaY = y - currentCoords.y;
      mouseMoveList.push( {time, deltaX, deltaY} );
      buttonIsDown = false;
      moveAve = getMoveAve();
    }
  };

  //load reactions -------------------------------------------------------------

  dispatcher.setListener('public', 'mouseDown', onMouseDown);
  dispatcher.setListener('public', 'mouseUp', onMouseUp);
  dispatcher.setListener('public', 'mouseMove', onMouseMove);

}
