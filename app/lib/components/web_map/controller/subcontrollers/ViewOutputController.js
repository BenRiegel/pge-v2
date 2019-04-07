//imports ----------------------------------------------------------------------

import { levelToValue } from '../../../../web_mapping/WebMapScale.js';
import { easeInOut, wait } from '../../../../utils/Utils.js';


//exports ----------------------------------------------------------------------

export default function WebMapViewOutputController(view, model, dispatcher){

  var { nodes, subcomponents } = view;
  var { root } = nodes;
  var { zoomControls, popup, graphicsLayer, basemapLayer} = subcomponents;

  //define state change reactions ----------------------------------------------

  var onConfigure = function(){
    var {width, height} = root.getDimensions();
    view.dimensions.width = width;
    view.dimensions.height = height;
    return basemapLayer.configure();
  }

  var calculateNumFramesPan = function(){
    var deltaXPx = Math.abs(model.coords.x.deltaValue / model.scale);
    var deltaYPx = Math.abs(model.coords.y.deltaValue / model.scale);
    var distancePx = Math.sqrt(deltaXPx * deltaXPx + deltaYPx * deltaYPx);
    var numFrames = Math.ceil(distancePx / 6);
    return Math.max(15, numFrames);
  }

  var animate = async function(numFrames, animationType){
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

          if (animationType === 'pan'){
            graphicsLayer.updateOnPan( {x:newX, y:newY, scale:newScale} );
            basemapLayer.updateOnPan( {x:deltaXPx, y:deltaYPx} );
          } else {
            var zoomFactor = baselineScale / newScale;
            graphicsLayer.updateOnZoom( {x:newX, y:newY, scale:newScale}, zoomFactor);
            basemapLayer.updateOnZoom( {x:deltaXPx, y:deltaYPx}, zoomFactor);
          }
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
    await animate(numFrames, 'pan');
    await basemapLayer.updateOnPanEnd();
  }

  var doZoomAnimation = async function(){
    var numFrames = 40;
    await animate(numFrames, 'zoom');
    var p = basemapLayer.updateOnZoomEnd();
    await wait(200);
    graphicsLayer.unselectGraphic();
    graphicsLayer.updateGraphics();
    await p;
  }

  var doAnimation = function(){
    if (model.coords.scale.hasChanged){
      return doZoomAnimation();
    } else if (model.coords.x.hasChanged || model.coords.y.hasChanged){
      return doPanAnimation();
    }
  }

  var doZoomHome = async function(){
    if (model.hasChanged){
      if (model.coords.scale.canAnimateHome){
        return doAnimation();
      } else {
        var p1 = graphicsLayer.fadeDown();
        var p2 = basemapLayer.fadeDown();
        await Promise.all([p1, p2]);
        graphicsLayer.updateGraphics();
        await basemapLayer.updateOnZoomHome();
        var p3 = graphicsLayer.fadeUp();
        var p4 = basemapLayer.fadeUp();
        await Promise.all([p3, p4]);
      }
    }
  }

  var onPointGraphicSelected = async function( {id, attributes} ){
  //  selectMenu.close();
    popup.close();
    graphicsLayer.selectGraphic(id);
    await doAnimation();
    await wait(100);
    popup.setContent(attributes);
    await popup.open();
  }

  var onClusterGraphicSelected = async function( {id} ){
  //  selectMenu.close();
    popup.close();
    graphicsLayer.selectGraphic(id);
    await doAnimation();
  }

  var onZoomInRequest = async function(){
    if (model.hasChanged){
      popup.close();
  //    selectMenu.close();
      graphicsLayer.unselectGraphic();
      await doAnimation();
    }
  }

  var onZoomOutRequest = async function(){
    if (model.hasChanged){
      popup.close();
    //  selectMenu.close();
      graphicsLayer.unselectGraphic();
      await doAnimation();
    }
  }

  var onZoomHomeRequest = async function(){
    if (model.hasChanged){
      popup.close();
  //    selectMenu.close();
      graphicsLayer.unselectGraphic();
      await doZoomHome();
    }
  }

  var onPopupClosed = function(){
    graphicsLayer.unselectGraphic();
  }

  var onPanStart = function(){
    popup.close();
  //  selectMenu.close();
    graphicsLayer.unselectGraphic();
  }

  var onPan = function(cumulativePan){
    graphicsLayer.updateOnPan(model);
    basemapLayer.updateOnPan(cumulativePan);
  }

  var onPanEnd = function(){
    basemapLayer.updateOnPanEnd();
  }

  var onNewSelectedTag = function(selectedTag){
    popup.close();
    graphicsLayer.unselectGraphic();
    graphicsLayer.filterLocations(selectedTag);
  }

  //load reactions -------------------------------------------------------------

  dispatcher.setListener('viewOutput', 'configure', onConfigure);
  dispatcher.setListener('viewOutput', 'newSelectedTag', onNewSelectedTag);
  dispatcher.setListener('viewOutput', 'pointGraphicSelected', onPointGraphicSelected);
  dispatcher.setListener('viewOutput', 'clusterGraphicSelected', onClusterGraphicSelected);
  dispatcher.setListener('viewOutput', 'zoomInRequest', onZoomInRequest);
  dispatcher.setListener('viewOutput', 'zoomHomeRequest', onZoomHomeRequest);
  dispatcher.setListener('viewOutput', 'zoomOutRequest', onZoomOutRequest);
  dispatcher.setListener('viewOutput', 'popupClosed', onPopupClosed);
  dispatcher.setListener('viewOutput', 'panStart', onPanStart);
  dispatcher.setListener('viewOutput', 'pan', onPan);
  dispatcher.setListener('viewOutput', 'panEnd', onPanEnd);

}
