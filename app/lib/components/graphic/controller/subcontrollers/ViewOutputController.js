//imports ----------------------------------------------------------------------

import { MIN_POINT_RADIUS } from '../../../graphics_layer/config/GraphicsLayerConfig.js';
import { calculateDeltaX } from '../../../../web_mapping/WebMercator.js';


//exports ----------------------------------------------------------------------

export default function GraphicViewOutputController(view, props, model){

  var { nodes } = view;
  var { root, location, label } = nodes;

  //define view reactions ------------------------------------------------------

  var updateScaleFactor = function(scaleFactor){
    var newDiameter = props.diameter * scaleFactor;
    newDiameter = Math.max(newDiameter, MIN_POINT_RADIUS * 2);
    var scaleFactor = newDiameter / (props.renderedRadius * 2);
    location.setScale(scaleFactor);
  }

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
  }

}
