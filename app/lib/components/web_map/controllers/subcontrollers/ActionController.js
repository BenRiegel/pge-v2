//imports ----------------------------------------------------------------------

import { easeInOut, wait } from '../../../../utils/Utils.js';


//exports ----------------------------------------------------------------------

export default function ActionController(state, view){

  var { viewpoint, action } = state;

  //define user event reactions ------------------------------------------------

  var calculateNumFramesPan = function(){
    var deltaXPx = Math.abs(viewpoint.props.x.deltaValue / viewpoint.scale);
    var deltaYPx = Math.abs(viewpoint.props.y.deltaValue / viewpoint.scale);
    var distancePx = Math.sqrt(deltaXPx * deltaXPx + deltaYPx * deltaYPx);
    var numFrames = Math.ceil(distancePx / 5);
    return Math.max(15, numFrames);
  }

  var getZoomFrameProps = function(percent){
    var newX = viewpoint.props.x.previousValue + percent * viewpoint.props.x.deltaValue;
    var newY = viewpoint.props.y.previousValue + percent * viewpoint.props.y.deltaValue;
    var newScale = viewpoint.props.scale.previousValue + percent * viewpoint.props.scale.deltaValue;
    var zoomScaleFactor = viewpoint.props.scale.previousValue / newScale;
    return {x:newX, y:newY, scale:newScale, zoomScaleFactor};
  }

  var gePanFrameProps = function(percent){
    var newX = viewpoint.props.x.previousValue + percent * viewpoint.props.x.deltaValue;
    var newY = viewpoint.props.y.previousValue + percent * viewpoint.props.y.deltaValue;
    return {x:newX, y:newY, scale:viewpoint.scale};
  }

  var animate = async function(numFrames, getFrameProps){
    var differences = [];
    var previousTime = new Date().getTime();
    await new Promise(resolve => {
      var frameNum = 0;
      var addNewFrame = function(){
        frameNum += 1;
        requestAnimationFrame( () => {
          var percent = easeInOut(frameNum, numFrames);
          var frameProps = getFrameProps(percent);
          action.set('frameProps', frameProps);
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

  var doZoomAnimation = async function(){
    action.begin('zoom');
    await animate(40, getZoomFrameProps);
    await wait(200);
    await action.end();
  }

  var doPanAnimation = async function(){
    action.begin('pan');
    var numFrames = calculateNumFramesPan();
    await animate(numFrames, getZoomFrameProps);
    action.end();
  }

  var doAnimation = async function(){
    if (viewpoint.props.scale.hasChanged){
      await doZoomAnimation();
    } else if (viewpoint.props.x.hasChanged || viewpoint.props.y.hasChanged){
      await doPanAnimation();
    }
  }

  var doZoomHome = async function(){
    if (viewpoint.canZoomHome){
      await doAnimation();
    } else {
      action.begin('zoomHome');

      action.end();
    }
  }

  //load reactions -------------------------------------------------------------

  viewpoint.addEventListener('panTo', doAnimation);
  viewpoint.addEventListener('zoomTo', doAnimation);
  viewpoint.addEventListener('zoomIn', doAnimation);
  viewpoint.addEventListener('zoomOut', doAnimation);
  viewpoint.addEventListener('zoomHome', doZoomHome);

}
