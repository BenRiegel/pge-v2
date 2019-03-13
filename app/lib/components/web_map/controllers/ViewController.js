//imports ----------------------------------------------------------------------

import { latLonToWebMercatorXY } from '../lib/WebMercator.js';
import { levelToValue } from '../lib/WebMapScale.js';
import { easeInOut, wait } from '../../../utils/Utils.js';


//exports ----------------------------------------------------------------------

export default function WebMapViewController(view, state){

  var { nodes, subcomponents } = view;
  var { root } = nodes;
  var { zoomControls, popup, graphicsLayer } = subcomponents;

  //configure dom --------------------------------------------------------------

  root.appendChildNode(zoomControls.rootNode);
  root.appendChildNode(popup.rootNode);
  root.appendChildNode(graphicsLayer.rootNode);

  //helper functions -----------------------------------------------------------

  var doPanAnimation = async function(){

    var deltaXPx = Math.abs(state.viewpoint.props.x.deltaValue / state.viewpoint.scaleValue);
    var deltaYPx = Math.abs(state.viewpoint.props.y.deltaValue / state.viewpoint.scaleValue);
    var distancePx = Math.sqrt(deltaXPx * deltaXPx + deltaYPx * deltaYPx);
    var numFrames = Math.ceil(distancePx / 5);
    numFrames = Math.max(15, numFrames);

    var differences = [];
    var previousTime = new Date().getTime();

    await new Promise(resolve => {
      var frameNum = 0;

      var addNewFrame = function(){
        frameNum += 1;
        requestAnimationFrame( () => {
          var percent = easeInOut(frameNum, numFrames);
          var newX = state.viewpoint.props.x.previousValue + percent * state.viewpoint.props.x.deltaValue;
          var newY = state.viewpoint.props.y.previousValue + percent * state.viewpoint.props.y.deltaValue;
          graphicsLayer.updateGraphicsOnPan({x:newX, y:newY, scaleValue:state.viewpoint.scaleValue});

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
    const NUM_FRAMES = 40;
    var differences = [];
    var previousTime = new Date().getTime();
    await new Promise(resolve => {
      var frameNum = 0;
      var scaleInit = levelToValue(state.viewpoint.props.scale.previousValue);   //do something about this
      var scaleEnd = levelToValue(state.viewpoint.props.scale.value);
      var deltaScale = scaleEnd - scaleInit;

      var addNewFrame = function(){
        frameNum += 1;
        requestAnimationFrame( () => {
          var percent = easeInOut(frameNum, NUM_FRAMES);
          var newX = state.viewpoint.props.x.previousValue + percent * state.viewpoint.props.x.deltaValue;
          var newY = state.viewpoint.props.y.previousValue + percent * state.viewpoint.props.y.deltaValue;
          var newScale = scaleInit + percent * deltaScale;
          var zoomLevel = scaleInit / newScale;
          graphicsLayer.updateGraphicsOnZoom({x:newX, y:newY, scaleValue:newScale}, zoomLevel);

          var newTime = new Date().getTime();
          differences.push(newTime - previousTime);
          previousTime = newTime;
          if (frameNum < NUM_FRAMES){
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

  var doAnimation = async function(){
    if (state.viewpoint.props.scale.hasChanged){
      await doZoomAnimation();
      await wait(100);
      graphicsLayer.resetGraphics();
    } else if (state.viewpoint.props.x.hasChanged || state.viewpoint.props.y.hasChanged){
      await doPanAnimation();
    }
  }

  var openPopup = function(){
    popup.setContent(state.selectedGraphic.attributes);
    popup.open();
  }


  state.viewpoint.addEventListener('panTo', doAnimation);
  state.selectedGraphic.addListener('openPopup', openPopup);
  state.viewpoint.addEventListener('zoomTo', doAnimation);
  //state.addEventListener('zoomIn', doAnimation);
  //state.addEventListener('zoomOut', doAnimation);
  //state.addEventListener('zoomHome', doAnimation);

  //public api -----------------------------------------------------------------

  this.addGraphicsLocations = function(locations){
    for (var location of locations){
      location.worldCoords = latLonToWebMercatorXY(location.geoCoords);
    }
    graphicsLayer.loadLocations(locations);
  }

}
