//imports ----------------------------------------------------------------------

import { calculateDeltaX } from '../../../lib/WebMercator.js';
import ComponentState from '../../../lib/ComponentState.js';


//exports ----------------------------------------------------------------------

export default function GraphicState(props, mapViewpoint, mapMovement){

  var mapCoords;

  var state = new ComponentState({
    renderedDiameter: 0,
    isHighlighted: false,
    screenCoords: {x:0, y:0},
  });

  state.updateMapCoords = function(){
    mapCoords = mapViewpoint.calculateMapCoords(props.worldCoords);
  }

  state.updateScreenCoords = function(){
    var screenCoords = mapViewpoint.calculateScreenCoords(mapCoords);
    this.setQuick('screenCoords', screenCoords);
  };

  state.updateRenderedDiameter = function(){
    var newRenderedDiameter = props.diameter * mapMovement.zoomScaleFactor;
    newRenderedDiameter = Math.max(newRenderedDiameter, props.minDiameter);
    this.setQuick('renderedDiameter', newRenderedDiameter);
  }

  //init -----------------------------------------------------------------------

  state.updateMapCoords();
  state.updateScreenCoords();
  state.updateRenderedDiameter();

  //public api -----------------------------------------------------------------

  return state;

}
