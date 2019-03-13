//imports ----------------------------------------------------------------------

import { calculateDeltaX } from '../../web_map/lib/WebMercator.js';


//exports ----------------------------------------------------------------------

export default function ClusterGraphicViewController(view, props, state, mapDimensions, webMapState){

  var { nodes } = view;
  var { root, location, label } = nodes;

  //configure dom --------------------------------------------------------------

  root.appendChildNode(location.node);
  root.appendChildNode(label.node);

  //define state change reactions ----------------------------------------------

  var updateHighlight = function(){
    location.setHighlight(state.isSelected);
  }

  var resetScaleFactor = function(){
    location.setScale(1);
  }

  var updateScaleFactor = function(zoomScaleFactor){
    var newRenderedDiameter = props.diameter * zoomScaleFactor;
    newRenderedDiameter = Math.max(newRenderedDiameter, props.minDiameter);
    var scaleFactor = newRenderedDiameter / (2 * props.renderedRadius);
    location.setScale(scaleFactor);
  }

  var updateScreenCoords = function(viewpoint){
    var deltaX = calculateDeltaX(props.worldCoords.x, viewpoint.x);
    var deltaXMap = deltaX / viewpoint.scaleValue;
    var screenX = deltaXMap + mapDimensions.width / 2;
    var deltaY = props.worldCoords.y - viewpoint.y;
    var deltaYMap = deltaY / viewpoint.scaleValue;
    var screenY = deltaYMap + mapDimensions.height / 2;
    root.setScreenCoords(screenX, screenY);
  };

  //load reactions -------------------------------------------------------------

  state.addListener('isSelected', updateHighlight);

  //init -----------------------------------------------------------------------

  updateHighlight();
  resetScaleFactor();
  updateScreenCoords(webMapState.viewpoint);

  //public api -----------------------------------------------------------------

  this.reset = function(viewpoint){
    resetScaleFactor();
    updateScreenCoords(viewpoint);
  }

  this.updateOnPan = function(viewpoint){
    updateScreenCoords(viewpoint);
  }

  this.updateOnZoom = function(viewpoint, zoomScaleFactor){
    updateScaleFactor(zoomScaleFactor);
    updateScreenCoords(viewpoint);
  }

}
