//imports ----------------------------------------------------------------------

import { levelToValue } from '../../../../web_mapping/WebMapScale.js';
import { easeInOut, wait } from '../../../../utils/Utils.js';


//exports ----------------------------------------------------------------------

export default function WebMapViewController(view, model, dispatcher){

  var { nodes, subcomponents } = view;
  var { root } = nodes;
  var { selectMenu, zoomControls, popup, graphicsLayer, basemapLayer} = subcomponents;

  //configure dom --------------------------------------------------------------

  root.appendChildNode(selectMenu.rootNode);
  root.appendChildNode(zoomControls.rootNode);
  root.appendChildNode(popup.rootNode);
  root.appendChildNode(graphicsLayer.rootNode);
  root.appendChildNode(basemapLayer.rootNode);

  //define state change reactions ----------------------------------------------

  /*var selectMenuEventStart = function(){
    zoomControls.disable();
    popup.disable();
    graphicsLayer.disable();
  }

  var selectMenuEventEnd = function(){
    zoomControls.enable();
    popup.enable();
    graphicsLayer.enable();
  }



  var openPopup = function(content){
    popup.setContent(content);
    popup.open();
  }

  var selectGraphic = function(graphicId){
    graphicsLayer.selectGraphic(graphicId);
  };

  var unselectGraphic = function(){
    graphicsLayer.unselectGraphic();
  }

  var onZoomEnd = async function(){
    graphicsLayer.unselectGraphic();
    graphicsLayer.updateGraphics();
    await basemapLayer.updateOnZoomEnd();
  }

  var onZoomHomeBegin = async function(){
    var p1 = graphicsLayer.fadeDown();
    var p2 = basemapLayer.fadeDown();
    await Promise.all([p1, p2]);
  }

  var onZoomHomeEnd = async function(){
    graphicsLayer.updateGraphics();
    await basemapLayer.updateOnZoomHome();
    var p1 = graphicsLayer.fadeUp();
    var p2 = basemapLayer.fadeUp();
    await Promise.all([p1, p2]);
  }

  var onPanEnd = async function(){
    await basemapLayer.updateOnPanEnd();
  }*/

  var calculateNumFramesPan = function(){
    var deltaXPx = Math.abs(model.coords.x.deltaValue / model.scale);
    var deltaYPx = Math.abs(model.coords.y.deltaValue / model.scale);
    var distancePx = Math.sqrt(deltaXPx * deltaXPx + deltaYPx * deltaYPx);
    var numFrames = Math.ceil(distancePx / 6);
    return Math.max(15, numFrames);
  }

  var animate = async function(numFrames){
    var differences = [];
    var previousTime = new Date().getTime();
    var totalTime = numFrames / 60 * 1000;
    var initTime = new Date().getTime();

    var baselineScale = model.coords.scale.previousValue;

    await new Promise(resolve => {
      var frameNum = 0;
      var addNewFrame = function(){
        frameNum += 1;
        requestAnimationFrame( () => {
          var newTime = new Date().getTime();
          var elapsedTime = newTime - initTime;
          var percentDone = Math.min(elapsedTime / totalTime, 1);
          //var percent = easeInOut(frameNum, numFrames);
          var percent = easeInOut(percentDone, 1);
          //console.log(elapsedTime, percentDone, frameNum);
          //var percent = easeInOut(frameNum, numFrames);

          var newX = model.coords.x.previousValue + percent * model.coords.x.deltaValue;
          var deltaXPx = (newX - model.coords.x.previousValue) / model.coords.scale.previousValue;
          var newY = model.coords.y.previousValue + percent * model.coords.y.deltaValue;
          var deltaYPx = (newY - model.coords.y.previousValue) / model.coords.scale.previousValue;
          var newScale = model.coords.scale.previousValue + percent * model.coords.scale.deltaValue;
          var zoomFactor = baselineScale / newScale;
          graphicsLayer.updateOnPan( {x:newX, y:newY, scale:newScale}, zoomFactor);
          basemapLayer.updateOnPan( {x:deltaXPx, y:deltaYPx}, zoomFactor);

      //    console.log(newX, newY, newScale);
          //state.set(newX, newY, newScale);
          var newTime = new Date().getTime();
          differences.push(newTime - previousTime);
          previousTime = newTime;
          //if (frameNum < numFrames){
          if (percentDone < 1){
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

  var doPanAnimation = async function(){
    var numFrames = calculateNumFramesPan();
    await animate(numFrames);
    await basemapLayer.updateOnPanEnd();
  }

  var doZoomAnimation = async function(){
    var numFrames = 40;
    await animate(numFrames);
    var p = basemapLayer.updateOnZoomEnd();
    await wait(200);
    graphicsLayer.unselectGraphic();
    graphicsLayer.updateGraphics();
    await p;
  }

  var doAnimation = function(){
    if (model.coords.scale.hasChanged){
      return doZoomAnimation();
      /*if (actionType === 'zoomHome' && !changeSummary.scale.canZoomHome){
        await doZoomHome(changeSummary);
      } else {
        await doZoomAnimation(changeSummary);
      }*/
    } else if (model.coords.x.hasChanged || model.coords.y.hasChanged){
      return doPanAnimation();
    }
  }

  var onNewSelectedTag = function(selectedTag){
    popup.close();
    graphicsLayer.filterLocations(selectedTag);
  }

  var onPointGraphicSelected = async function( {id, attributes} ){
    popup.close();
    graphicsLayer.selectGraphic(id);
    await doAnimation();
    await wait(100);
    popup.setContent(attributes);
    await popup.open();
  }

  var onClusterGraphicSelected = async function( {id} ){
    popup.close();
    graphicsLayer.selectGraphic(id);
    await doAnimation();
  }

  var onZoomInRequest = async function(){
    await doAnimation();
  }

  var onZoomOutRequest = async function(){
    await doAnimation();
  }

  var onZoomHomeRequest = async function(){
    //await doAnimation();
  }

  var onPopupClosed = function(){
    graphicsLayer.unselectGraphic();
  }

  //load reactions -------------------------------------------------------------

  dispatcher.setListener('view', 'newSelectedTag', onNewSelectedTag);
  dispatcher.setListener('view', 'pointGraphicSelected', onPointGraphicSelected);
  dispatcher.setListener('view', 'clusterGraphicSelected', onClusterGraphicSelected);
  dispatcher.setListener('view', 'zoomInRequest', onZoomInRequest);
  dispatcher.setListener('view', 'zoomOutRequest', onZoomOutRequest);
  dispatcher.setListener('view', 'popupClosed', onPopupClosed);

}
