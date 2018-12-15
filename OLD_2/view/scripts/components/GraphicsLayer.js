//imports ----------------------------------------------------------------------

import { latLonToWebMercator } from '../../../models/WebMercator.js';
import projects from '../../../data/Projects.js';
import State from '../lib/State.js';
import NodeInstance from '../lib/NodeInstance.js';
import { addChildrenTo, doForAll } from '../lib/ViewUtils.js';
import Graphic from './Graphic.js';
import '../../stylesheets/graphics_layer.scss';


//module code block ------------------------------------------------------------

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

var clamp = function(value, min, max){
  return Math.min(Math.max(value, min), max);
}


//exports ----------------------------------------------------------------------

export default function NewGraphicsLayer(pointSelectAction, clusterSelectAction){

  //state ----------------------------------------------------------------------

  var state = new State('selectedTag');

  //view -----------------------------------------------------------------------

  var clickEventHandler = function(evt){
    if (evt.target.dataset.type == 'point'){
      pointSelectAction(evt.target.dataset.id, evt.target.dataset.worldX, evt.target.dataset.worldY);
    } else {
      clusterSelectAction(evt.target.dataset.worldX, evt.target.dataset.worldY);
    }
  }

  var container = new NodeInstance('div');
  container.className = 'graphics-layer';
  container.onClick = clickEventHandler;

  var graphics = [];
  for (var project of projects){
    var graphic = new Graphic({
      id: project.id,
      tags: project.tags,
      worldCoords: latLonToWebMercator({lat:project.lat, lon:project.lon}),
    });
    graphics.push(graphic);
  }
  addChildrenTo(container, graphics);

  var combineGraphics = function(){
    doForAll(graphics, 'resetState');
    for (var graphic of graphics){
      if (!graphic.state.isSelected || graphic.state.isCombined){
        continue;
      }
      var done = false;
      while (!done){
        var clusterFound = false;
        for (var compareGraphic of graphics){
          if (graphic === compareGraphic || !compareGraphic.state.isSelected || compareGraphic.state.isCombined){
            continue;
          }
          var distanceX = Math.abs(graphic.state.screenCoords.x - compareGraphic.state.screenCoords.x);
          var distanceY = Math.abs(graphic.state.screenCoords.y - compareGraphic.state.screenCoords.y);
          var distanceThreshold = graphic.state.radius + compareGraphic.state.radius;

          if (distanceX <= distanceThreshold && distanceY <= distanceThreshold){
            clusterFound = true;
            compareGraphic.state.parentGraphic = graphic;
            graphic.state.type = 'cluster';
            graphic.state.combinedGraphics = graphic.state.combinedGraphics.concat(compareGraphic.state.combinedGraphics);

            graphic.state.worldCoords.x = getAve(graphic.state.combinedGraphics, element => element.state.worldCoords.x);
            graphic.state.worldCoords.y = getAve(graphic.state.combinedGraphics, element => element.state.worldCoords.y);
            graphic.state.screenCoords.x = getAve(graphic.state.combinedGraphics, element => element.state.screenCoords.x);
            graphic.state.screenCoords.y = getAve(graphic.state.combinedGraphics, element => element.state.screenCoords.y);

            var newRadius = 0;
            for (var combinedGraphic of graphic.state.combinedGraphics){
              var dist = getDistance(graphic.state.screenCoords, combinedGraphic.state.screenCoords);
              if (dist > newRadius){
                newRadius = dist;
              }
            }
            graphic.state.radius = clamp(newRadius, 10, 16);
          }
        }
        done = !clusterFound;
      }
    }
  };

  //controller -----------------------------------------------------------------

  state.selectedTag.onChange = async function(currentValue, previousValue){
    doForAll(graphics, 'updateIsSelected', currentValue);
    combineGraphics();
    doForAll(graphics, 'render');
  };

  //public api -----------------------------------------------------------------

  return {
    rootNode: container.rootNode,
    setSelectedTag: function(newValue){
      state.selectedTag.set(newValue);
    },
    enable: function(){
      container.onClick = clickEventHandler;
    },
    disable: function(){
      container.onClick = null;
    },
    onMapCoordsChange: function(mapProperties){
      doForAll(graphics, 'updateScreenCoords', mapProperties);
      combineGraphics();
      doForAll(graphics, 'render');
    },
    panTo: async function(deltaXPx, deltaYPx, pixelNum){
      await doForAll(graphics, 'pan', deltaXPx, deltaYPx, pixelNum);
    },
  }

}
