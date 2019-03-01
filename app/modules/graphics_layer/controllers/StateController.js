//imports ----------------------------------------------------------------------

import Graphic from '../../graphic/Graphic.js';
import { getDistance } from '../../../lib/Utils.js';
import { WORLD_CIRCUMFERENCE } from '../../../lib/WebMercator.js';


//exports ----------------------------------------------------------------------

export default function StateController(mapDimensions, mapViewpoint, state){

  //define state change reactions ----------------------------------------------

  var updateBaselineScale = function(){
    state.set('baselineScale', mapViewpoint.scale);
  }

  var updatePixelNum = function(){
    var pixelNum = WORLD_CIRCUMFERENCE / mapViewpoint.scale;
    state.set('pixelNum', pixelNum);
  }

  var updateViewpointCenterMap = function(){
    var viewpointCenterMap = {
      x: mapViewpoint.x / mapViewpoint.scale - mapDimensions.width / 2,
      y: mapViewpoint.y / mapViewpoint.scale - mapDimensions.height / 2,
    }
    state.set('viewpointCenterMap', viewpointCenterMap);
  }

  var updateZoomScaleFactor = function(){
    var scaleFactor = state.baselineScale / mapViewpoint.scale;
    state.set('zoomScaleFactor', scaleFactor);
  }

  var createNewGraphics = function(){
    const MIN_RADIUS = 10;
    const MAX_RADIUS = 20;
    var graphics = [];
    var mappedLocations = [...state.mappedLocations];
    var location = mappedLocations.shift();
    while (location){
      var graphicProps = {
        id: location.id,
        worldCoords: {x:location.worldCoords.x, y:location.worldCoords.y},
        numLocations: 1,
        diameter: 0,
        type:'point',
        minDiameter: MIN_RADIUS * 2,
      };
      var sumX = location.worldCoords.x;
      var sumY = location.worldCoords.y;
      var points = [location.worldCoords];
      var renderedRadius = MIN_RADIUS;
      var done = false;
      while (!done){
        var clusterFound = false;
        var index = 0;
        for (var compareLocation of mappedLocations){
          var thresholdDistance = (renderedRadius + MIN_RADIUS) * mapViewpoint.scale;
          var distance = getDistance(graphicProps.worldCoords, compareLocation.worldCoords);
          if (distance < thresholdDistance){
            clusterFound = true;
            points.push(compareLocation.worldCoords);
            graphicProps.numLocations += 1;
            graphicProps.type = 'cluster';
            sumX += compareLocation.worldCoords.x;
            sumY += compareLocation.worldCoords.y;
            graphicProps.worldCoords.x = sumX / graphicProps.numLocations;
            graphicProps.worldCoords.y = sumY / graphicProps.numLocations;
            for (var point of points){
              var pointRadius = getDistance(graphicProps.worldCoords, point) / mapViewpoint.scale;
              graphicProps.diameter = Math.max(graphicProps.diameter, pointRadius * 2);
              renderedRadius = Math.max(renderedRadius, pointRadius);
            }
            graphicProps.diameter = Math.min(graphicProps.diameter, MAX_RADIUS * 2);
            renderedRadius = Math.min(renderedRadius, MAX_RADIUS);
            mappedLocations.splice(index, 1);
            break;
          }
          index += 1;
        }
        done = !clusterFound;
      }
      var graphic = new Graphic(graphicProps, mapViewpoint, state);
      graphics.push(graphic);
      location = mappedLocations.shift();
    }
    state.set('graphics', graphics);
  }

  var resetListeners = function(){
    state.props.highlightedGraphicId.removeListeners();
    state.props.zoomScaleFactor.removeListeners();
    state.props.viewpointCenterMap.removeListeners();
  }

  //load state change reactions ------------------------------------------------

  state.addListenerByType('mappedLocations', 'newGraphics', createNewGraphics);
  state.addListenerByType('mappedLocations', 'resetListeners', resetListeners);  // <--this shouldn't be under mapped locations


/*  mapViewpoint.addListener('zoomEnd - graphicsLayerReset', () => {
    updateBaselineScale();
    updateZoomScaleFactor();
    loadNewGraphics();
    state.set('highlightedGraphicId', null);   //don't like this
  });*/

  mapViewpoint.addListener('zoomAction', () => {
    updatePixelNum();
    updateZoomScaleFactor();
    updateViewpointCenterMap();
  });

  mapViewpoint.addListener('panAction', () => {
    updateViewpointCenterMap();
  });

  mapViewpoint.addListener('zoomHomeAction', () => {
    loadNewGraphics();
    updateBaselineScale();
    updatePixelNum();
    updateZoomScaleFactor();
    updateViewpointCenterMap();
  });

  //init -----------------------------------------------------------------------

  updatePixelNum();
  updateBaselineScale();
  updateZoomScaleFactor();
  updateViewpointCenterMap();

}
