export default function GraphicsLayerViewOutputController(view, model, webMapModel, webMapDimensions){

  var { nodes, subcomponents } = view;
  var { root } = nodes;

  //public api -----------------------------------------------------------------

  this.renderGraphics = function(graphics){
    for (var graphic of graphics){
      graphic.renderView(webMapModel, webMapDimensions);
    }
  };

  this.updateOnGraphicSelection = function(){
    if (model.props.selectedGraphicId.hasChanged){
      for (var graphic of view.subcomponents.graphics){
        graphic.updateModel(model.selectedGraphicId);
      }
    }
  };

  this.updateOnPan = function(newViewpoint){
    for (var graphic of subcomponents.graphics){
      graphic.updateOnPan(newViewpoint, webMapDimensions);
    }
  };

  this.updateOnZoom = function(newViewpoint, zoomFactor){
    for (var graphic of subcomponents.graphics){
      graphic.updateOnZoom(newViewpoint, zoomFactor, webMapDimensions);
    }
  };

  this.fadeDown = function(){
    return root.setOpacity('0', true);
  };

  this.fadeUp = function(){
    return root.setOpacity('1', true);
  };

}


/*  var createGraphics = function(){
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
      var graphic = new Graphic(graphicProps);
      graphic.renderView(webMapModel, webMapDimensions);
      graphics.push(graphic);
      location = mappedLocations.shift();
    }
    return graphics;
  }*/
