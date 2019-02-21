//imports ----------------------------------------------------------------------

import ComponentState from '../lib/ComponentState.js';


//exports ----------------------------------------------------------------------

export default function GraphicState(props, layerState){

  var state = new ComponentState({
    mapCoords: undefined,
    screenCoords: undefined,
    renderedDiameter: undefined,
    isHighlighted: undefined,
  });

  //define state change reactions ----------------------------------------------

  var updateMapCoords = function(){
    var mapCoords = layerState.calculateMapCoords(props.worldCoords);
    state.set('mapCoords', mapCoords, false);
  }

  var updateScreenCoords = function(){
    var screenCoords = layerState.calculateScreenCoords(state.mapCoords);
    state.set('screenCoords', screenCoords);
  };

  var updateRenderedDiameter = function(){
    var newRenderedDiameter = props.diameter * layerState.zoomScaleFactor;
    newRenderedDiameter = Math.max(newRenderedDiameter, props.minDiameter);
    state.set('renderedDiameter', newRenderedDiameter);
  }

  var updateIsHighlighted = function(){
    state.set('isHighlighted', props.id === layerState.highlightedGraphicId);
  }

  //load state change reactions ------------------------------------------------

  layerState.addListener('highlightedGraphicId', updateIsHighlighted);
  layerState.addListener('viewpointCenterMap', updateScreenCoords);
  layerState.addListener('zoomScaleFactor', updateMapCoords);
  layerState.addListener('zoomScaleFactor', updateRenderedDiameter);

  //init state -----------------------------------------------------------------

  updateMapCoords();
  updateScreenCoords();
  updateRenderedDiameter();
  updateIsHighlighted();

  //public api -----------------------------------------------------------------

  return state;

}
