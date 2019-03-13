//imports ----------------------------------------------------------------------

import PointGraphic from '../../point_graphic/PointGraphic.js';
import ClusterGraphic from '../../cluster_graphic/ClusterGraphic.js';
import { getDistance } from '../../../utils/Utils.js';
import { MIN_POINT_RADIUS, MAX_POINT_RADIUS } from '../config/GraphicsLayerConfig.js';


//exports ----------------------------------------------------------------------

export default function GraphicsLayerViewController(view, state, webMapState, mapDimensions){

  var { nodes, subcomponents } = view;
  var { root, pointsContainer, clustersContainer } = nodes;

  //configure dom --------------------------------------------------------------

  root.appendChildNode(pointsContainer.node);
  root.appendChildNode(clustersContainer.node);

  //define state change reactions ----------------------------------------------

  var updateDomListener = function(isListening){
    root.isListening = isListening;
  }

  var clusterGraphics = function(){
    var clusterCounter = 0;
    for (var point of view.subcomponents.pointGraphics){
      point.updateIsObscured(false);
    }
    for (var point of view.subcomponents.pointGraphics){
      if (!point.hasSelectedTag || point.isObscured){
        continue;
      }
      var clusterProps = {
        id: clusterCounter,
        worldCoords: {x:point.worldCoords.x, y:point.worldCoords.y},
        numLocations: 1,
        diameter: 0,
        type:'cluster',
        minDiameter: MIN_POINT_RADIUS * 2,
        renderedRadius: MIN_POINT_RADIUS,
      };
      var sumX = point.worldCoords.x;
      var sumY = point.worldCoords.y;
      var clusteredPoints = [point.worldCoords];

      var clusterCreated = false;
      var done = false;
      while (!done){
        var clusterFound = false;
        for (var comparePoint of view.subcomponents.pointGraphics){
          if (comparePoint === point || !comparePoint.hasSelectedTag || comparePoint.isObscured){
            continue;
          }
          var thresholdDistance = (clusterProps.renderedRadius + MIN_POINT_RADIUS) * webMapState.viewpoint.scaleValue;
          var distance = getDistance(clusterProps.worldCoords, comparePoint.worldCoords);
          if (distance < thresholdDistance){
            clusterFound = true;
            clusterCreated = true;

            comparePoint.updateIsObscured(true);
            clusteredPoints.push(comparePoint.worldCoords);
            clusterProps.numLocations += 1;
            sumX += comparePoint.worldCoords.x;
            sumY += comparePoint.worldCoords.y;
            clusterProps.worldCoords.x = sumX / clusterProps.numLocations;
            clusterProps.worldCoords.y = sumY / clusterProps.numLocations;
            for (var clusteredPoint of clusteredPoints){
              var pointRadius = getDistance(clusterProps.worldCoords, clusteredPoint) / webMapState.viewpoint.scaleValue;
              clusterProps.diameter = Math.max(clusterProps.diameter, pointRadius * 2);
              clusterProps.renderedRadius = Math.max(clusterProps.renderedRadius, pointRadius);
            }
            clusterProps.diameter = Math.min(clusterProps.diameter, MAX_POINT_RADIUS * 2);
            clusterProps.renderedRadius = Math.min(clusterProps.renderedRadius, MAX_POINT_RADIUS);
            break;
          }
        }
        done = !clusterFound;
      }
      if (clusterCreated){
        point.updateIsObscured(true);
        var cluster = new ClusterGraphic(clusterProps, mapDimensions, webMapState);
        view.subcomponents.clusterGraphics.push(cluster);
        clustersContainer.appendChildNode(cluster.rootNode);
        clusterCounter += 1;
      }
    }

  }


  var filterGraphics = function(){
    for (var cluster of view.subcomponents.clusterGraphics){
      cluster.removeListeners();
    }
    view.subcomponents.clusterGraphics = [];
    clustersContainer.removeAllChildNodes();
    clusterGraphics();
  }

  //load reactions -------------------------------------------------------------

  state.addListenerByType('selectedTag', 'clusterGraphics', filterGraphics);

  //init -----------------------------------------------------------------------

  updateDomListener(true);

  //public api -----------------------------------------------------------------

  this.updateDomListener = updateDomListener;

  this.setGraphics = function(graphicPropsList){
    for (var graphicProps of graphicPropsList){
      var pointGraphic = new PointGraphic(graphicProps, state, mapDimensions, webMapState);
      view.subcomponents.pointGraphics.push(pointGraphic);
      pointsContainer.appendChildNode(pointGraphic.rootNode);
    }
  };

  this.resetGraphics = function(){
    filterGraphics();
  }

  this.updateGraphicsOnPan = function(state){
    for (var graphic of view.subcomponents.pointGraphics){
      graphic.update(state);
    }
    for (var graphic of view.subcomponents.clusterGraphics){
      graphic.updateOnPan(state);
    }
  }

  this.updateGraphicsOnZoom = function(state, zoomFactor){
    for (var graphic of view.subcomponents.pointGraphics){
      graphic.update(state);
    }
    for (var graphic of view.subcomponents.clusterGraphics){
      graphic.updateOnZoom(state, zoomFactor);
    }
  }

}