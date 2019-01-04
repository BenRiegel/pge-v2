//imports ----------------------------------------------------------------------

import ComponentState from '../../../lib/ComponentState.js';
import Emitter from '../../../lib/Emitter.js';
import { clamp } from '../../../lib/Utils.js';


//put these elsewhere

var getDistance = function(c1, c2){
  return Math.sqrt( (c2.x - c1.x) * (c2.x - c1.x) + (c2.y - c1.y) * (c2.y - c1.y) );
}

var getAve = function(array, f){
  var sum = 0;
  for (var element of array){
    sum += f(element);
  }
  return sum / array.length;
}



//exports ----------------------------------------------------------------------

export default function GraphicsLayerState(mapViewpoint, mapProperties){

  //create state var -----------------------------------------------------------

  var emitter = new Emitter();

  var state = new ComponentState({
    selectedTag: null,
    isEnabled: true,
    graphicsList: [],
  });

  state.addListener = emitter.addListener;

  state.setGraphics = function(graphicsList){
    this.set('graphicsList', graphicsList);
    clusterGraphics();
  }

  state.filterGraphics = function(selectedTag){
    state.set('selectedTag', selectedTag);
    clusterGraphics();
  }

  var clusterGraphics = function(){
    for (var graphic of state.graphicsList){
      graphic.reset();
    }
    for (var graphic of state.graphicsList){
      if (!graphic.isSelected || graphic.isCombined){
        continue;
      }
      var done = false;
      while (!done){
        var clusterFound = false;
        for (var compareGraphic of state.graphicsList){
          if (graphic === compareGraphic || !compareGraphic.isSelected || compareGraphic.isCombined){
            continue;
          }
          var distanceX = Math.abs(graphic.screenCoords.x - compareGraphic.screenCoords.x);
          var distanceY = Math.abs(graphic.screenCoords.y - compareGraphic.screenCoords.y);
          var distanceThreshold = graphic.radius + compareGraphic.radius;

          if (distanceX <= distanceThreshold && distanceY <= distanceThreshold){
            clusterFound = true;
            compareGraphic.parentGraphic = graphic;
            graphic.type = 'cluster';
            graphic.combinedGraphics = graphic.combinedGraphics.concat(compareGraphic.combinedGraphics);

            graphic.worldCoords.x = getAve(graphic.combinedGraphics, element => element.worldCoords.x);
            graphic.worldCoords.y = getAve(graphic.combinedGraphics, element => element.worldCoords.y);
            graphic.screenCoords.x = getAve(graphic.combinedGraphics, element => element.screenCoords.x);
            graphic.screenCoords.y = getAve(graphic.combinedGraphics, element => element.screenCoords.y);

            var newRadius = 0;
            for (var combinedGraphic of graphic.combinedGraphics){
              var dist = getDistance(graphic.screenCoords, combinedGraphic.screenCoords);
              if (dist > newRadius){
                newRadius = dist;
              }
            }
            graphic.radius = clamp(newRadius, 10, 16);
          }
        }
        done = !clusterFound;
      }
    }
    emitter.broadcast('graphicNode - updateOnClusteringComplete');
  };

  mapViewpoint.addListener('graphicsLayer - updateOnZoom', clusterGraphics);

  //public api -----------------------------------------------------------------

  return state;

}
