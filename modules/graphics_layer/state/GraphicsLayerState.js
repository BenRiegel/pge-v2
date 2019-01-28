//imports ----------------------------------------------------------------------

import ComponentState from '../../../lib/ComponentState.js';
import { getDistance } from '../../../lib/Utils.js';


//exports ----------------------------------------------------------------------

export default function GraphicsLayerState(mapViewpoint, mapProperties){

  //helper variable ------------------------------------------------------------

  const MIN_RADIUS = 10;
  const MAX_RADIUS = 20;

  var locations = [];
  var graphics = [];

  //create state var -----------------------------------------------------------

  var state = new ComponentState({
    isEnabled: true,
    selectedTag: null,
    highlightedGraphicId: null,
    minDiameter: MIN_RADIUS * 2,
  });

  //modify behavior of selectedTag prop ----------------------------------------

  state.setOnChange('selectedTag', function(){
    this.requestUpdate('location', 'isMapped');
    this.requestUpdate('self', 'clusterGraphics');
  });

  state.addNewGraphicState = function(graphicState){
    graphics.push(graphicState);
  }

  state.addNewLocationState = function(locationState){
    locations.push(locationState);
  }

  //define state change reactions ----------------------------------------------

  var clusterGraphics = async function(){
    var graphicsInfo = [];
    for (var location of locations){
      var graphicInfo = {
        isVisible: false,
        worldCoords: {x:location.worldCoords.x, y:location.worldCoords.y},
        numLocations: 1,
        diameter: 0,
        isHighlighted: false,
      };
      graphicsInfo.push(graphicInfo);
    }

    var mappedLocations = locations.filter( location => location.isMapped );
    var location = mappedLocations.shift();
    while (location){
      var id = location.id;
      var graphicInfo = graphicsInfo[id];
      graphicInfo.isVisible = true;
      var sumX = location.worldCoords.x;
      var sumY = location.worldCoords.y;
      var points = [location.worldCoords];
      var renderedRadius = MIN_RADIUS;
      var done = false;

      while (!done){
        var clusterFound = false;
        var index = 0;
        for (var compareLocation of mappedLocations){
          var thresholdDistance = (renderedRadius + MIN_RADIUS) * mapProperties.pixelSize;
          var distance = getDistance(graphicInfo.worldCoords, compareLocation.worldCoords);
          if (distance < thresholdDistance){
            clusterFound = true;
            points.push(compareLocation.worldCoords);
            graphicInfo.numLocations += 1;
            sumX += compareLocation.worldCoords.x;
            sumY += compareLocation.worldCoords.y;
            graphicInfo.worldCoords.x = sumX / graphicInfo.numLocations;
            graphicInfo.worldCoords.y = sumY / graphicInfo.numLocations;
            for (var point of points){
              var pointRadius = getDistance(graphicInfo.worldCoords, point) / mapProperties.pixelSize;
              graphicInfo.diameter = Math.max(graphicInfo.diameter, pointRadius * 2);
              renderedRadius = Math.max(renderedRadius, pointRadius);
            }
            graphicInfo.diameter = Math.min(graphicInfo.diameter, MAX_RADIUS * 2);
            renderedRadius = Math.min(renderedRadius, MAX_RADIUS);
            mappedLocations.splice(index, 1);
            break;
          }
          index += 1;
        }
        done = !clusterFound;
      }
      location = mappedLocations.shift();
    }

    graphics.forEach( (graphic, i) => {
      graphic.update(graphicsInfo[i]);
    });
  }

  //load state change reactions ------------------------------------------------

  state.addListener('selectedTag', 'self', 'clusterGraphics', clusterGraphics);
  mapViewpoint.addListener('graphicsLayer - clusterGraphics', clusterGraphics);

  //public api -----------------------------------------------------------------

  return state;

}
