//imports ----------------------------------------------------------------------

import Graphic from '../../../graphic/Graphic.js';
import { getDistance } from '../../../../utils/Utils.js';
import { MIN_POINT_RADIUS, MAX_POINT_RADIUS } from '../../config/GraphicsLayerConfig.js';


//exports ----------------------------------------------------------------------

export default function GraphicsLayerViewController(view, model, dispatcher, webMapModel){

  var { nodes, subcomponents } = view;
  var { root } = nodes;

  //define model change reactions ----------------------------------------------

  var webMapDimensions;

  var createGraphics = function(){
    var graphics = [];
    var mappedLocations = model.locations.filter(location => location.hasSelectedTag);
    var location = mappedLocations.shift();
    while(location){
      var graphicProps = {
        id: location.id,
        type: 'point',
        worldCoords: {x:location.worldCoords.x, y:location.worldCoords.y},
        numLocations: 1,
        diameter: 0,
        renderedRadius: MIN_POINT_RADIUS,
      };
      var sumX = location.worldCoords.x;
      var sumY = location.worldCoords.y;
      var clusteredPoints = [location.worldCoords];
      var clusterCreated = false;
      var done = false;
      while (!done){
        var clusterFound = false;
        for (var compareLocation of mappedLocations){
          var thresholdDistance = (graphicProps.renderedRadius + MIN_POINT_RADIUS) * webMapModel.scale;
          var distance = getDistance(graphicProps.worldCoords, compareLocation.worldCoords);
          if (distance < thresholdDistance){
            clusterFound = true;
            clusterCreated = true;
            clusteredPoints.push(compareLocation.worldCoords);
            graphicProps.type = 'cluster';
            graphicProps.numLocations += 1;
            sumX += compareLocation.worldCoords.x;
            sumY += compareLocation.worldCoords.y;
            graphicProps.worldCoords.x = sumX / graphicProps.numLocations;
            graphicProps.worldCoords.y = sumY / graphicProps.numLocations;
            for (var clusteredPoint of clusteredPoints){
              var pointRadius = getDistance(graphicProps.worldCoords, clusteredPoint) / webMapModel.scale;
              graphicProps.diameter = Math.max(graphicProps.diameter, pointRadius * 2);
              graphicProps.renderedRadius = Math.max(graphicProps.renderedRadius, pointRadius);
            }
            graphicProps.renderedRadius = Math.min(graphicProps.renderedRadius, MAX_POINT_RADIUS);
            graphicProps.diameter = Math.min(graphicProps.diameter, MAX_POINT_RADIUS * 2);
            graphicProps.minScaleFactor = MIN_POINT_RADIUS / graphicProps.renderedRadius;
            mappedLocations = mappedLocations.filter(location => location !== compareLocation);
            break;
          }
        }
        done = !clusterFound;
      }
      var graphic = new Graphic(graphicProps, model, webMapModel, webMapDimensions);
      graphics.push(graphic);
      location = mappedLocations.shift();
    }
    return graphics;
  }

  var updateGraphics = function(){
    view.subcomponents = createGraphics();
    var graphicNodes = view.subcomponents.map(graphic => graphic.rootNode);
    root.removeAllChildNodes();
    root.appendChildNodes(graphicNodes);
  }

  var onSelectGraphic = function(graphicId){
    for (var graphic of view.subcomponents){
      graphic.update('updateIsSelected');
    }
  }

  var onPan = function(newViewpoint){
    for (var graphic of view.subcomponents){
      graphic.update('pan', newViewpoint);
    }
  }

  var onZoom = function(newViewpoint, zoomFactor){
    for (var graphic of view.subcomponents){
      graphic.update('zoom', newViewpoint, zoomFactor);
    }
  }

  var onConfigure = function(dimensions){
    webMapDimensions = dimensions;
  }

  var onFadeDown = function(){
    return root.setOpacity('0', true);
  }

  var onFadeUp = function(){
    return root.setOpacity('1', true);
  }

  //load reactions -------------------------------------------------------------

  dispatcher.setListener('view', 'setLocations', updateGraphics);
  dispatcher.setListener('view', 'selectLocations', updateGraphics);
  dispatcher.setListener('view', 'selectGraphic', onSelectGraphic);
  dispatcher.setListener('view', 'updateGraphics', updateGraphics);
  dispatcher.setListener('view', 'pan', onPan);
  dispatcher.setListener('view', 'zoom', onZoom);
  dispatcher.setListener('view', 'configure', onConfigure);
  dispatcher.setListener('view', 'fadeDown', onFadeDown);
  dispatcher.setListener('view', 'fadeUp', onFadeUp);

}
