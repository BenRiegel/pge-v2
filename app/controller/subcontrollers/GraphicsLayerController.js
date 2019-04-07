//imports ----------------------------------------------------------------------

import { getDistance } from '../../lib/utils/Utils.js';
import { INIT_SELECTED_TAG } from '../../config/Config.js';
import { latLonToWebMercatorXY } from '../../lib/web_mapping/WebMercator.js';
import view from '../../view/View.js';
import model from '../../model/Model.js';


//module code block ------------------------------------------------------------

var { components } = view;
var { webMap } = components;

const MIN_POINT_RADIUS = 10;
const MAX_POINT_RADIUS = 20;
var locations;
var filteredLocations;

var getLocations = function(){
  var locationsList = [];
  for (var project of model.projects){
    var attributes = Object.assign({}, project);
    delete attributes.id;
    delete attributes.geoCoords;
    delete attributes.tags;
    var location = {
      id: project.id,
      worldCoords: latLonToWebMercatorXY(project.geoCoords),
      tags: project.tags,
      hasSelectedTag: undefined,
      attributes,
    }
    locationsList.push(location);
  }
  return locationsList;
};

var filterLocations = function(selectedOptionKey){
  return locations.filter(location => {
    return location.tags.includes(selectedOptionKey);
  });
};


var createGraphics = function(scale){
  var graphics = [];
  var mappedLocations = [...filteredLocations];
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
        var thresholdDistance = (graphicProps.renderedRadius + MIN_POINT_RADIUS) * scale;
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
            var pointRadius = getDistance(graphicProps.worldCoords, clusteredPoint) / scale;
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
    //var graphic = new Graphic(graphicProps, model, webMapModel, webMapDimensions);
    graphics.push(graphicProps);
    location = mappedLocations.shift();
  }
  return graphics;
}



//exports ----------------------------------------------------------------------

export async function load(){
  await webMap.hasRendered;
  locations = getLocations();
  //filteredLocations = filterLocations(INIT_SELECTED_TAG);
  //var graphics = createGraphics(webMap.scale);
  //console.log(graphics);
  webMap.graphicsLayer.setLocations(locations);
  webMap.graphicsLayer.filterLocations(INIT_SELECTED_TAG);
};
