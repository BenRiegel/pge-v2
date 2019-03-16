//imports ----------------------------------------------------------------------

import { easeInOut, wait } from '../../../utils/Utils.js';
import { rectifyXCoord } from '../../../web_mapping/WebMercator.js';


//exports ----------------------------------------------------------------------

export default function WebMapStateController(state, dispatcher, view){

  var { subcomponents } = view;
  var { graphicsLayer, popup, zoomControls } = subcomponents;

  //define user event reactions ------------------------------------------------

  var calculateNumFramesPan = function( {x, y, scale} ){
    var deltaXPx = Math.abs(x.deltaValue / state.scale);
    var deltaYPx = Math.abs(y.deltaValue / state.scale);
    var distancePx = Math.sqrt(deltaXPx * deltaXPx + deltaYPx * deltaYPx);
    var numFrames = Math.ceil(distancePx / 6);
    return Math.max(15, numFrames);
  }

  var animate = async function(numFrames, changeSummary){
    var differences = [];
    var previousTime = new Date().getTime();
    await new Promise(resolve => {
      var frameNum = 0;
      var addNewFrame = function(){
        frameNum += 1;
        requestAnimationFrame( () => {
          var percent = easeInOut(frameNum, numFrames);
          var newX = changeSummary.x.initValue + percent * changeSummary.x.deltaValue;
          var newY = changeSummary.y.initValue + percent * changeSummary.y.deltaValue;
          var newScale = changeSummary.scale.initValue + percent * changeSummary.scale.deltaValue;
          state.set(newX, newY, newScale);
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
    console.log(differences);
  }

  var doPanAnimation = async function(changeSummary){
    state.beginAction('pan');
    var numFrames = calculateNumFramesPan(changeSummary);
    await animate(numFrames, changeSummary);
    state.endAction();
  }

  var doZoomAnimation = async function(changeSummary){
    state.beginAction('zoom');
    var numFrames = 40;
    await animate(numFrames, changeSummary);
    state.endAction();
  }

  var doZoomHome = async function(changeSummary){
    await state.beginAction('zoomHome');
    var newX = changeSummary.x.newValueRectified;
    var newY = changeSummary.y.newValueRectified;
    var newScale = changeSummary.scale.newValueRectified;
    state.set(newX, newY, newScale);
    await state.endAction();
  }

  var doAnimation = async function(actionType, worldCoords){
    var changeSummary = state.getChangeSummary(actionType, worldCoords);
    if (changeSummary.scale.hasChanged){
      if (actionType === 'zoomHome' && !changeSummary.scale.canZoomHome){
        await doZoomHome(changeSummary);
      } else {
        await doZoomAnimation(changeSummary);
      }
    } else if (changeSummary.x.hasChanged || changeSummary.y.hasChanged){
      await doPanAnimation(changeSummary);
    }
  }

  //load reactions -------------------------------------------------------------

  dispatcher.addListener('animateTo', doAnimation);
  zoomControls.addEventListener('zoomButtonClicked', doAnimation);

}
