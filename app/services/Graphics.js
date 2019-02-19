//imports ----------------------------------------------------------------------

import Graphic from '../modules/graphic/Graphic.js';
import { getSelectedProjects } from './Projects';
import { getDistance } from '../lib/Utils.js';


//module code block ------------------------------------------------------------

const MIN_RADIUS = 10;
const MAX_RADIUS = 20;

var createGraphics = async function(selectedTag, mapViewpoint, mapMovement){

  var graphics = [];

  var mappedLocations = await getSelectedProjects(selectedTag);

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
    location = mappedLocations.shift();
    var graphic = new Graphic(graphicProps, mapViewpoint, mapMovement);
    graphics.push(graphic);
  }
  return graphics;
}

//exports ----------------------------------------------------------------------

export { createGraphics };
