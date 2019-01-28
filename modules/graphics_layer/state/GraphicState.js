//imports ----------------------------------------------------------------------

import { calculateDeltaX } from '../../../lib/WebMercator.js';
import ComponentState from '../../../lib/ComponentState.js';


//exports ----------------------------------------------------------------------

export default function GraphicState(props, mapViewpoint, mapProperties, layerState){

  var state = new ComponentState({
    numLocations: 1,
    isVisible: false,
    diameter: 0,
    renderedDiameter: 0,
    isHighlighted: false,
    worldCoords: {x:0, y:0},
    screenCoords: {x:0, y:0},
  });

  state.update = function(stateInfo){
    this.set('isVisible', stateInfo.isVisible);
    this.set('numLocations', stateInfo.numLocations);
    this.set('worldCoords', stateInfo.worldCoords);
    this.set('diameter', stateInfo.diameter);
    this.set('isHighlighted', stateInfo.isHighlighted);
    updateScreenCoords();
    updateRenderedDiameter();
  }

  //define state change reactions ----------------------------------------------

  var updateScreenCoords = function(){
    var deltaX = calculateDeltaX(state.worldCoords.x, mapViewpoint.coords.x);
    var deltaY = state.worldCoords.y - mapViewpoint.coords.y;
    var screenCoordX = deltaX / mapProperties.pixelSize + mapProperties.halfMapWidthPx;
    var screenCoordY = deltaY / mapProperties.pixelSize + mapProperties.halfMapHeightPx;
    state.setQuick('screenCoords', {x:screenCoordX, y:screenCoordY});
  };

  var panScreenCoords = function( {deltaXPx, deltaYPx} ){
    var screenCoordX = state.screenCoords.x - deltaXPx;
    if (screenCoordX < 0){
      screenCoordX += mapProperties.pixelNum;
    }
    if (screenCoordX > mapProperties.pixelNum){
      screenCoordX -= mapProperties.pixelNum;
    }
    var screenCoordY = state.screenCoords.y - deltaYPx;
    if (screenCoordY < 0){
      screenCoordY += mapProperties.pixelNum;
    }
    if (screenCoordY > mapProperties.pixelNum){
      screenCoordY -= mapProperties.pixelNum;
    }
    state.setQuick('screenCoords', {x:screenCoordX, y:screenCoordY});
  }

  var updateRenderedDiameter = function(){
    var newRenderedDiameter = state.diameter * mapProperties.scaleFactor;
    newRenderedDiameter = Math.max(newRenderedDiameter, layerState.minDiameter);
    state.setQuick('renderedDiameter', newRenderedDiameter);
  }

  var updateIsHighlighted = function(){
    state.set('isHighlighted', props.id === layerState.highlightedGraphicId);
  }

  //load state change reactions ------------------------------------------------

  mapViewpoint.addListener('graphic - updateOnPan', deltaPx => {
    if (state.isVisible){
      panScreenCoords(deltaPx);
    }
  });

  mapViewpoint.addListener('graphic - updateOnZoom', () => {
    if (state.isVisible){
      updateScreenCoords();
      updateRenderedDiameter();
    }
  });
  layerState.addListener('highlightedGraphicId', 'graphic', 'isHighlighted', updateIsHighlighted);

  //init -----------------------------------------------------------------------

  updateScreenCoords();
  updateRenderedDiameter();
  updateIsHighlighted();

  //public api -----------------------------------------------------------------

  return state;

}
