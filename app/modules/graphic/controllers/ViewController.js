//imports ----------------------------------------------------------------------

import { calculateDeltaX } from '../../../lib/WebMercator.js';


//exports ----------------------------------------------------------------------

export default function GraphicViewController(view, props, mapViewpoint, layerState, state, mapDimensions){

  var { nodes } = view;
  var { root, location, label } = nodes;

  //configure dom --------------------------------------------------------------

  root.appendChildNode(location.node);
  root.appendChildNode(label.node);

  //define state change reactions ----------------------------------------------

  var updateIsHighlighted = function(){
    location.setHighlight(state.isHighlighted);
  }

  var updateScaleFactor = function(){
    var zoomScaleFactor = layerState.baselineScale / mapViewpoint.scale;
    var newRenderedDiameter = props.diameter * zoomScaleFactor;
    newRenderedDiameter = Math.max(newRenderedDiameter, props.minDiameter);
    var scaleFactor = newRenderedDiameter / 20;  //change this
    location.setScale(scaleFactor);
  }

  var updateScreenCoords = function(){
    var deltaX = calculateDeltaX(props.worldCoords.x, mapViewpoint.x);
    var deltaXMap = deltaX / mapViewpoint.scale;
    var screenX = deltaXMap + mapDimensions.width / 2;
    var deltaY = props.worldCoords.y - mapViewpoint.y;
    var deltaYMap = deltaY / mapViewpoint.scale;
    var screenY = deltaYMap + mapDimensions.height / 2;
    root.setScreenCoords(screenX, screenY);
  };

  //load reactions -------------------------------------------------------------

  mapViewpoint.addListener('zoomAction', () => {
    updateScaleFactor();
    updateScreenCoords();
  });

  mapViewpoint.addListener('panAction', () => {
    updateScreenCoords();
  });

  state.addListener('isHighlighted', updateIsHighlighted);

  //init -----------------------------------------------------------------------

  updateIsHighlighted();
  updateScaleFactor();
  updateScreenCoords();

}
