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

  var disableAll = function(){
    //zoomControls.disable();
  //  selectMenu.disable();
  //  popup.disable();
    //graphicsLayer.disable();
    //basemapLayer.disable();
  }

  var enableAll = function(){
    //zoomControls.enable();
  //  selectMenu.enable();
    //graphicsLayer.enable();
  //  popup.enable();
    //basemapLayer.enable();
  }


  var onPointGraphicSelected = async function( {id, attributes} ){
    disableAll();
    selectMenu.close();
    popup.close();
    graphicsLayer.selectGraphic(id);
    await doAnimation();
    await wait(100);
    popup.setContent(attributes);
    await popup.open();
    enableAll();
  }

  var onClusterGraphicSelected = async function( {id} ){
    disableAll();
    selectMenu.close();
    popup.close();
    graphicsLayer.selectGraphic(id);
    await doAnimation();
    enableAll();
  }

  var onZoomInRequest = async function(){
    if (model.hasChanged){
      disableAll();
      popup.close();
      selectMenu.close();
      await doAnimation();
      enableAll();
    }
  }

  var onZoomOutRequest = async function(){
    if (model.hasChanged){
      disableAll();
      popup.close();
      selectMenu.close();
      await doAnimation();
      enableAll();
    }
  }

  var onZoomHomeRequest = async function(){
    if (model.hasChanged){
      disableAll();
      popup.close();
      selectMenu.close();
      await doAnimation();
      await doZoomHome();
      enableAll();
    }
  }

  var onPopupClosed = function(){
    graphicsLayer.unselectGraphic();
  }

  var onPopupActionStart = function(){
    disableAll();
  }

  var onPopupActionEnd = function(){
    enableAll();
  }

  var onPopupHasExpanded = function(){
    //selectMenu.disable();
    //zoomControls.disable();
    //graphicsLayer.disable();
    //basemapLayer.disable();
  }

  var onPopupHasContracted = function(){
    //selectMenu.enable();
    //zoomControls.enable();
    //graphicsLayer.enable();
    //basemapLayer.enable();
  }

  var onPan = function(cumulativePan){

    graphicsLayer.updateOnPan(model);
    basemapLayer.updateOnPan(cumulativePan);
  }

  var onPanEnd = function(){
    basemapLayer.updateOnPanEnd();
    //  popup.enable();
    //  selectMenu.enable();
    //  graphicsLayer.enable();
    //  zoomControls.enable();
  }

  var onPanStart = function(){
    popup.close();
    selectMenu.close();
  //  popup.disable();
  //  selectMenu.disable();
  //  graphicsLayer.disable();
  //  zoomControls.disable();
  }

  var onNewSelectedTag = function(selectedTag){
    popup.close();
    graphicsLayer.unselectGraphic();
    graphicsLayer.filterLocations(selectedTag);
  }

  var onSelectMenuActionStart = function(){
    disableAll();
  }

  var onSelectMenuActionEnd = function(){
    enableAll();
  }

  //load reactions -------------------------------------------------------------

  dispatcher.setListener('view', 'configure', onConfigure);

  //selectMenu
  dispatcher.setListener('view', 'newSelectedTag', onNewSelectedTag);
  dispatcher.setListener('view', 'selectMenuActionStart', onSelectMenuActionStart);
  dispatcher.setListener('view', 'selectMenuActionEnd', onSelectMenuActionEnd);

  //graphicsLayer
  dispatcher.setListener('view', 'pointGraphicSelected', onPointGraphicSelected);
  dispatcher.setListener('view', 'clusterGraphicSelected', onClusterGraphicSelected);

  //zoomControls
  dispatcher.setListener('view', 'zoomInRequest', onZoomInRequest);
  dispatcher.setListener('view', 'zoomHomeRequest', onZoomHomeRequest);
  dispatcher.setListener('view', 'zoomOutRequest', onZoomOutRequest);

  //popup
  dispatcher.setListener('view', 'popupClosed', onPopupClosed);
  dispatcher.setListener('view', 'popupActionStart', onPopupActionStart);
  dispatcher.setListener('view', 'popupActionEnd', onPopupActionEnd);
  dispatcher.setListener('view', 'popupIsContracted', onPopupHasContracted);
  dispatcher.setListener('view', 'popupIsExpanded', onPopupHasExpanded);

  //basemapLayer
  dispatcher.setListener('view', 'panStart', onPanStart);
  dispatcher.setListener('view', 'pan', onPan);
  dispatcher.setListener('view', 'panEnd', onPanEnd);

}
