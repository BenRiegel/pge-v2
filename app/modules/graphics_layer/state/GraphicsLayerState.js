//imports ----------------------------------------------------------------------

import ComponentState from '../lib/ComponentState.js';
import { WORLD_CIRCUMFERENCE } from '../../../lib/WebMercator.js';


//exports ----------------------------------------------------------------------

export default function GraphicsLayerState(mapDimensions, mapViewpoint, graphicsService){

  //create state var -----------------------------------------------------------

  var state = new ComponentState({
    isEnabled: true,
    selectedTag: null,
    graphics: null,
    pixelNum: undefined,
    baselineScale: undefined,
    zoomScaleFactor: undefined,
    highlightedGraphicId: null,
    viewpointCenterMap: undefined,
  });

  state.calculateMapCoords = function(worldCoords){
    return {
      x: worldCoords.x / mapViewpoint.scale,
      y: worldCoords.y / mapViewpoint.scale,
    }
  }

  state.calculateScreenCoords = function(mapCoords){
    var screenX = mapCoords.x - state.viewpointCenterMap.x + mapDimensions.width / 2;
    if (screenX < 0){
      screenX += state.pixelNum;
    }
    if (screenX > state.pixelNum){
      screenX -= state.pixelNum;
    }
    var screenY = mapCoords.y - state.viewpointCenterMap.y + mapDimensions.height / 2;
    return {
      x: screenX,
      y: screenY,
    }
  }

  //define state change reactions ----------------------------------------------

  var updatePixelNum = function(){
    var pixelNum = WORLD_CIRCUMFERENCE / mapViewpoint.scale;
    state.set('pixelNum', pixelNum, false);
  }

  var updateViewpointCenterMap = function(){
    var x = mapViewpoint.x / mapViewpoint.scale;
    var y = mapViewpoint.y / mapViewpoint.scale;
    state.set('viewpointCenterMap', {x, y});
  }

  var updateBaselineScale = function(){
    state.set('baselineScale', mapViewpoint.scale, false);
  }

  var updateZoomScaleFactor = function(){
    var scaleFactor = state.baselineScale / mapViewpoint.scale;
    state.set('zoomScaleFactor', scaleFactor);
  }

  var loadNewGraphics = function(){
    state.removeListeners('highlightedGraphicId');
    state.removeListeners('viewpointCenterMap');
    state.removeListeners('zoomScaleFactor');
    var newGraphics = graphicsService.createNewGraphics(state.selectedTag, state);
    state.set('graphics', newGraphics);
  }

  //load state change reactions ------------------------------------------------

  state.addListener('selectedTag', loadNewGraphics);

  mapViewpoint.addListener('zoomEnd - graphicsLayerReset', () => {
    updateBaselineScale();
    updateZoomScaleFactor();
    loadNewGraphics();
    state.set('highlightedGraphicId', null);
  });

  mapViewpoint.addListener('zoomAction', () => {
    updatePixelNum();
    updateZoomScaleFactor();
    updateViewpointCenterMap();
  });

  mapViewpoint.addListener('panAction', () => {
    updateViewpointCenterMap();
  });

  mapViewpoint.addListener('zoomHomeAction', () => {
    loadNewGraphics();
    updateBaselineScale();
    updatePixelNum();
    updateZoomScaleFactor();
    updateViewpointCenterMap();
  });

  //init state -----------------------------------------------------------------

  updatePixelNum();
  updateBaselineScale();
  updateZoomScaleFactor();
  updateViewpointCenterMap();

  //public api -----------------------------------------------------------------

  return state;

}
