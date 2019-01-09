//imports ----------------------------------------------------------------------

import ContainerNode from './nodes/ContainerNode.js';
import Graphic from '../../graphic/Graphic.js';
import { getDistance } from '../../../lib/Utils.js';


//exports ----------------------------------------------------------------------

export default function GraphicsLayerView(mapViewpoint, mapProperties, state, eventsEmitter){

  //helper variables ------------------------------------------------------------

  var graphics = [];

  //create nodes ---------------------------------------------------------------

  var container = new ContainerNode(state, eventsEmitter);

  //define state change reactions ----------------------------------------------

  var clusterGraphics = function(){
    for (var graphic of graphics){
      graphic.resetState();
    }
    for (var graphic of graphics){
      if (!graphic.isMapped || graphic.isCovered){
        continue;
      }
      var done = false;
      var numCovering = 1;
      var newRadius = 0;
      var newRenderedRadius = graphic.renderedRadius;
      var sumX = graphic.worldCoords.x;
      var sumY = graphic.worldCoords.y;
      var center = {x:graphic.worldCoords.x, y:graphic.worldCoords.y};
      var points = [graphic.worldCoords];

      while(!done){
        var clusterFound = false;
        for (var compareGraphic of graphics){
          if (compareGraphic === graphic || !compareGraphic.isMapped || compareGraphic.isCovered){
            continue;
          }
          var thresholdDistance = (newRenderedRadius + compareGraphic.renderedRadius) * mapProperties.pixelSize;
          var distance = getDistance(center, compareGraphic.worldCoords);
          if (distance < thresholdDistance){
            clusterFound = true;
            compareGraphic.setIsCovered(graphic.id);
            points.push(compareGraphic.worldCoords);
            numCovering += 1;
            sumX += compareGraphic.worldCoords.x;
            sumY += compareGraphic.worldCoords.y;
            center.x = sumX / numCovering;
            center.y = sumY / numCovering;
            for (var point of points){
              var radius = getDistance(center, point) / mapProperties.pixelSize;
              newRadius = Math.max(newRadius, radius);
              newRenderedRadius = Math.max(newRenderedRadius, radius);
            }
            newRenderedRadius = Math.min(newRenderedRadius, 20);
          }
        }
        done = !clusterFound;
      }

      graphic.setIsVisible()
      graphic.setNum(numCovering);
      graphic.setRadius(newRadius, newRenderedRadius);
      graphic.setWorldCoords(center)
    }
  }


  //load reactions -------------------------------------------------------------

  state.addListener('selectedTag', 'layerView', 'cluster', clusterGraphics);

  //public api -----------------------------------------------------------------

  this.rootNode = container.node;

  this.addNewGraphic = function(graphicInfo){
    var graphic = new Graphic(graphicInfo, mapViewpoint, mapProperties, state);
    graphics.push(graphic);
    container.node.appendChild(graphic.rootNode);
  }

  this.clusterGraphics = clusterGraphics;

  this.hasRendered = new Promise(async resolve => {
    container.render();
    resolve();
  });

}


  /*var clusterGraphics = function(){
    for (var graphic of graphics){
      graphic.resetState();
    }
    for (var i = 0; i < graphics.length; i++){
      var graphic = graphics[i];
      if (!graphic.isMapped || graphic.isCovered){
        continue;
      }
      var numCovering = 1;
      var newDiameterPx = 0;
      var thresholdDistance = mapProperties.pixelSize * 32;
      for (var j = i+1; j < graphics.length; j++){
        var compareGraphic = graphics[j];
        if (!compareGraphic.isMapped || compareGraphic.isCovered){
          continue;
        }
        var distance = getDistance(graphic.worldCoords, compareGraphic.worldCoords);
        if (distance <= thresholdDistance){
          numCovering += 1;
          compareGraphic.setIsCovered(graphic.id);
          var diameterPx = distance / mapProperties.pixelSize;
          if (diameterPx > newDiameterPx){
            newDiameterPx = diameterPx;
          }
        }
      }
      newDiameterPx = clamp(newDiameterPx, numCovering * 3, 32);
      graphic.setDiameter(newDiameterPx);
      graphic.setNum(numCovering);
    }
  }*/
