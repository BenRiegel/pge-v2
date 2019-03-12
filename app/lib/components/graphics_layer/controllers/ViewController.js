//imports ----------------------------------------------------------------------

import Graphic from '../../graphic/Graphic.js';
import { getDistance } from '../../../utils/Utils.js';


//exports ----------------------------------------------------------------------

export default function GraphicsLayerViewController(view, state, mapViewpoint, mapDimensions){

  var { nodes } = view;
  var { root, subcomponents } = nodes;

  //define state change reactions ----------------------------------------------

  var updateDomListener = function(isListening){
    root.isListening = isListening;
  }

  var createNewGraphics = function(){
    const MIN_RADIUS = 10;
    const MAX_RADIUS = 20;
    var graphics = [];
    var filteredLocations = [...state.filteredLocations];
    var location = filteredLocations.shift();
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
        for (var compareLocation of filteredLocations){
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
            filteredLocations.splice(index, 1);
            break;
          }
          index += 1;
        }
        done = !clusterFound;
      }
      var graphic = new Graphic(graphicProps, mapViewpoint, state, mapDimensions);
      graphics.push(graphic);
      location = filteredLocations.shift();
    }
    return graphics;
  }

  var loadNewGraphics = function(){
    root.removeAllChildNodes();
    view.subcomponents = createNewGraphics();
    var childNodes = view.subcomponents.map( graphic => graphic.rootNode );
    root.appendChildNodes(childNodes);
  }

  var updateHighlightedGraphics = function(){
    for (var graphic of view.subcomponents){
      graphic.updateIsHighlighted(state.highlightedGraphicId);
    }
  }

  //load reactions -------------------------------------------------------------

  state.addListener('filteredLocations', loadNewGraphics);
  state.addListener('highlightedGraphicId', updateHighlightedGraphics);

  //init -----------------------------------------------------------------------

  updateDomListener(true);

  //public api -----------------------------------------------------------------

  this.updateDomListener = updateDomListener;

}
