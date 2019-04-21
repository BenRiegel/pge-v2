//imports ----------------------------------------------------------------------

import { easeInOut, wait } from '../../../../utils/Utils.js';
import { rectifyXCoord, calculateDeltaX } from '../../../../web_mapping/WebMercator.js';


//exports ----------------------------------------------------------------------

export default function WebMapViewOutputController(view, model){

  var { nodes, subcomponents } = view;
  var { root } = nodes;
  var { popup, graphicsLayer, basemapLayer} = subcomponents;

  //helper functions -----------------------------------------------------------

  var initPanViewpoint;

  var getPanAnimationDuration = function(){
    var deltaXPx = Math.abs(model.coords.x.deltaValue / model.scale);
    var deltaYPx = Math.abs(model.coords.y.deltaValue / model.scale);
    var distancePx = Math.sqrt(deltaXPx * deltaXPx + deltaYPx * deltaYPx);
    var duration = Math.ceil(distancePx / 6) * 1000/60;
    return Math.max(250, duration);
  };

  var getZoomAnimationDuration = function(){
    return 650;
  };

  var doPanAnimation = async function(){
    var duration = getPanAnimationDuration();
    var initTime = new Date().getTime();
    await new Promise(resolve => {
      var addNewFrame = function(){
        requestAnimationFrame( () => {
          var newTime = new Date().getTime();
          var elapsedTime = newTime - initTime;
          var percentDone = Math.min(elapsedTime / duration, 1);
          var percent = easeInOut(percentDone, 1);
          var newX = model.coords.x.previousValue + percent * model.coords.x.deltaValue;
          newX = rectifyXCoord(newX);
          var deltaX = calculateDeltaX(model.coords.x.previousValue, newX);
          var deltaXPx = deltaX / model.coords.scale.previousValue;
          var newY = model.coords.y.previousValue + percent * model.coords.y.deltaValue;
          var deltaYPx = (model.coords.y.previousValue - newY) / model.coords.scale.previousValue;
          graphicsLayer.updateOnPan( {x:newX, y:newY, scale:model.scale} );
          basemapLayer.updateOnPan( {x:deltaXPx, y:deltaYPx} );
          if (percentDone < 1){
            addNewFrame();
          } else {
            resolve();
          }
        });
      };
      addNewFrame();
    });
    basemapLayer.updateOnPanEnd();   //don't await here
  };

  var doZoomAnimation = async function(){
    var baselineScale = model.coords.scale.previousValue;
    var duration = getZoomAnimationDuration();
    var initTime = new Date().getTime();
    await new Promise(resolve => {
      var addNewFrame = function(){
        requestAnimationFrame( () => {
          var newTime = new Date().getTime();
          var elapsedTime = newTime - initTime;
          var percentDone = Math.min(elapsedTime / duration, 1);
          var percent = easeInOut(percentDone, 1);
          var newX = model.coords.x.previousValue + percent * model.coords.x.deltaValue;
          newX = rectifyXCoord(newX);
          var deltaX = calculateDeltaX(model.coords.x.previousValue, newX);
          var deltaXPx = deltaX / model.coords.scale.previousValue;
          var newY = model.coords.y.previousValue + percent * model.coords.y.deltaValue;
          var deltaYPx = (model.coords.y.previousValue - newY) / model.coords.scale.previousValue;
          var newScale = model.coords.scale.previousValue + percent * model.coords.scale.deltaValue;
          var zoomFactor = baselineScale / newScale;
          graphicsLayer.updateOnZoom( {x:newX, y:newY, scale:newScale}, zoomFactor);
          basemapLayer.updateOnZoom( {x:deltaXPx, y:deltaYPx}, zoomFactor);
          if (percentDone < 1){
            addNewFrame();
          } else {
            resolve();
          }
        });
      };
      addNewFrame();
    });
    var p = basemapLayer.updateOnZoomEnd();
    await wait(200);
    graphicsLayer.updateGraphics();
    await p;
  };

  var doZoomHome = async function(){
    var p1 = graphicsLayer.fadeDown();
    var p2 = basemapLayer.fadeDown();
    await Promise.all([p1, p2]);
    graphicsLayer.updateGraphics();
    await basemapLayer.updateOnZoomHome();
    var p3 = graphicsLayer.fadeUp();
    var p4 = basemapLayer.fadeUp();
    await Promise.all([p3, p4]);
  };

  //public api -----------------------------------------------------------------

  this.configure = function(){
    var {width, height} = root.getDimensions();
    view.dimensions.width = width;
    view.dimensions.height = height;
    return basemapLayer.configure();
  };

  this.onPointGraphicSelected = async function(id, attributes){
    popup.close();
    graphicsLayer.selectGraphic(id);
    if (model.hasChanged){
      await doPanAnimation();
    }
    await wait(100);
    await popup.open(attributes);
  };

  this.onClusterGraphicSelected = function(id){
    popup.close();
    graphicsLayer.selectGraphic(id);
    if (model.hasChanged){
      return doZoomAnimation();
    }
  };

  this.onZoomInOutRequest = function(){
    if (model.hasChanged){
      popup.close();
      graphicsLayer.unselectGraphic();
      return doZoomAnimation();
    }
  };

  this.onZoomHomeRequest = function(){
    if (model.hasChanged){
      popup.close();
      graphicsLayer.unselectGraphic();
      if (model.coords.scale.canAnimateHome){
        if (model.coords.scale.hasChanged){
          return doZoomAnimation();
        } else {
          return doPanAnimation();
        }
      } else {
        return doZoomHome();
      }
    }
  };

  this.onPopupClose = function(){
    graphicsLayer.unselectGraphic();
  };

  this.onPanStart = function(){
    initPanViewpoint = {x:model.x, y:model.y};
    popup.close();
    graphicsLayer.unselectGraphic();
  };

  this.onPan = function(){
    var cumulativePanX = (initPanViewpoint.x - model.x) / model.scale;
    var cumulativePanY = (initPanViewpoint.y - model.y) / model.scale;
    graphicsLayer.updateOnPan(model);
    basemapLayer.updateOnPan( {x:cumulativePanX, y:cumulativePanY} );
  };

  this.onPanEnd = function(){
    basemapLayer.updateOnPanEnd();
  };

}
