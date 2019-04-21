//imports ----------------------------------------------------------------------

import { calculateDeltaX } from '../../../../web_mapping/WebMercator.js';


//exports ----------------------------------------------------------------------

export default function GraphicViewOutputController(view, props, model){

  var { nodes } = view;
  var { root, location } = nodes;

  //helper functions -----------------------------------------------------------

  var updateScaleFactor = function(zoomScaleFactor){
    var newDiameter = props.diameter * zoomScaleFactor;
    newDiameter = Math.max(newDiameter, props.minDiameter);
    var scaleFactor = newDiameter / (props.renderedRadius * 2);
    location.setScale(scaleFactor);
  };

  var updateScreenCoords = function(viewpoint, webMapDimensions){
    var deltaX = calculateDeltaX(props.worldCoords.x, viewpoint.x);
    var deltaXMap = deltaX / viewpoint.scale;
    var screenX = deltaXMap + webMapDimensions.width / 2;
    var deltaY = props.worldCoords.y - viewpoint.y;
    var deltaYMap = deltaY / viewpoint.scale;
    var screenY = deltaYMap + webMapDimensions.height / 2;
    var screenCoords = {x:screenX, y:screenY};
    root.setScreenCoords(screenCoords);
  };

  //public api -----------------------------------------------------------------

  this.updateHighlight = function(){
    location.setHighlight(model.isSelected);
  };

  this.updateSelectedStyling = function(){
    if (model.props.isSelected.hasChanged){
      this.updateHighlight();
    }
  };

  this.updateOnPan = function(viewpoint, webMapDimensions){
    updateScreenCoords(viewpoint, webMapDimensions);
  };

  this.updateOnZoom = function(viewpoint, scaleFactor, webMapDimensions){
    updateScreenCoords(viewpoint, webMapDimensions);
    if (props.type === 'cluster'){
      updateScaleFactor(scaleFactor);
    }
  };

  this.renderView = function(viewpoint, webMapDimensions){
    updateScreenCoords(viewpoint, webMapDimensions);
  };

}
