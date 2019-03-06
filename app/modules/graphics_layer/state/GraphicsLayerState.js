//imports ----------------------------------------------------------------------

import ComponentState from '../../../lib/ComponentState.js';


//exports ----------------------------------------------------------------------

export default function GraphicsLayerState(){

  //public state variable ------------------------------------------------------

  var state = new ComponentState({
    mappedLocations: null,
    graphics: null,
    baselineScale: undefined,        /* feel like these should be somewhere else */
    pixelNum: undefined,             //  <<--
    zoomScaleFactor: undefined,      //  <<--
    viewpointCenterMap: undefined,   //  <<--
    highlightedGraphicId: null,
  });

  //modify behavior of mappedLocations prop ------------------------------------

  state.props.mappedLocations.onChange = function(){
    this.updateType('resetListeners');
    this.updateType('newGraphics');
  }

  //public api -----------------------------------------------------------------

  return state;

}
