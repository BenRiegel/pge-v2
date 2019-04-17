//imports ----------------------------------------------------------------------

import { easeInOut, wait } from '../../../../utils/Utils.js';


//exports ----------------------------------------------------------------------

export default function WebMapViewOutputController(view, model){

  var { nodes, subcomponents } = view;
  var { root } = nodes;
  var { popup, graphicsLayer, basemapLayer} = subcomponents;

  //define state change reactions ----------------------------------------------

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
    var differences = [];
    var initTime = new Date().getTime();
    var previousTime = initTime;
    var duration = getPanAnimationDuration();
    await new Promise(resolve => {
      var addNewFrame = function(){
        requestAnimationFrame( () => {
          var newTime = new Date().getTime();
          var elapsedTime = newTime - initTime;
          var percentDone = Math.min(elapsedTime / duration, 1);
          var percent = easeInOut(percentDone, 1);
          var newX = model.coords.x.previousValue + percent * model.coords.x.deltaValue;
          var deltaXPx = (model.coords.x.previousValue - newX) / model.coords.scale.previousValue;
          var newY = model.coords.y.previousValue + percent * model.coords.y.deltaValue;
          var deltaYPx = (model.coords.y.previousValue - newY) / model.coords.scale.previousValue;
          graphicsLayer.updateOnPan( {x:newX, y:newY, scale:model.scale} );
          basemapLayer.updateOnPan( {x:deltaXPx, y:deltaYPx} );
          var newTime = new Date().getTime();
          differences.push(newTime - previousTime);
          previousTime = newTime;
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
    console.log(differences);
  };

  var doZoomAnimation = async function(){
    var differences = [];
    var previousTime = new Date().getTime();
    var initTime = previousTime;
    var duration = getZoomAnimationDuration();
    var baselineScale = model.coords.scale.previousValue;
    await new Promise(resolve => {
      var addNewFrame = function(){
        requestAnimationFrame( () => {
          var newTime = new Date().getTime();
          var elapsedTime = newTime - initTime;
          var percentDone = Math.min(elapsedTime / duration, 1);
          var percent = easeInOut(percentDone, 1);
          var newX = model.coords.x.previousValue + percent * model.coords.x.deltaValue;
          var deltaXPx = (model.coords.x.previousValue - newX) / model.coords.scale.previousValue;
          var newY = model.coords.y.previousValue + percent * model.coords.y.deltaValue;
          var deltaYPx = (model.coords.y.previousValue - newY) / model.coords.scale.previousValue;
          var newScale = model.coords.scale.previousValue + percent * model.coords.scale.deltaValue;
          var zoomFactor = baselineScale / newScale;
          graphicsLayer.updateOnZoom( {x:newX, y:newY, scale:newScale}, zoomFactor);
          basemapLayer.updateOnZoom( {x:deltaXPx, y:deltaYPx}, zoomFactor);
          var newTime = new Date().getTime();
          differences.push(newTime - previousTime);
          previousTime = newTime;
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
    console.log(differences);
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
    popup.close();
    graphicsLayer.unselectGraphic();
  };

  this.onPan = function(cumulativePan){
    graphicsLayer.updateOnPan(model);
    basemapLayer.updateOnPan(cumulativePan);
  };

  this.onPanEnd = function(){
    basemapLayer.updateOnPanEnd();
  };

}
