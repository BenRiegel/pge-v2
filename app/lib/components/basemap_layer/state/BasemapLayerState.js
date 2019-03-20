//imports ----------------------------------------------------------------------

import ComponentState from '../../../lib/ComponentState.js';
import { valueToLevel } from '../../../lib/WebMapScale.js';
import CenterTileIndicesProp from './CenterTileIndicesProp.js'


//exports ----------------------------------------------------------------------

export default function BasemapLayerState(mapDimensions, mapViewpoint){

  const BASELINE_TILE_SIZE = 256;

  //create state var -----------------------------------------------------------

  var state = new ComponentState({
    isEnabled: true,       //nope
    baselineScale: undefined,   //nope
    imageTileLevel: undefined,
    numBasemapTiles: undefined,
    tileSize: undefined,            //nope
    centerTileScreenCoords: undefined,
    centerTileIndices: {x:undefined, y:undefined},
  });

  state.props.centerTileIndices = new CenterTileIndicesProp({x:undefined, y:undefined});

  //define state change reactions ----------------------------------------------

  var updateBaselineScale = function(){
    state.set('baselineScale', mapViewpoint.scale, false);
  }

  var setImageTileLevel = function(){
    var imageTileLevel = valueToLevel(state.baselineScale);
    imageTileLevel = Math.round(imageTileLevel);
    state.set('imageTileLevel', imageTileLevel, false);
  }

  var setNumBasemapTiles = function(){
    var numBasemapTiles = Math.pow(2, state.imageTileLevel);
    state.set('numBasemapTiles', numBasemapTiles, false);
  }

  var updateTileSize = function(){
    var scaleFactor = state.baselineScale / mapViewpoint.scale;
    var tileSize = scaleFactor * BASELINE_TILE_SIZE;
    state.set('tileSize', tileSize);
  }

  var updateCenterTileProps = function(){
    var viewpointCenterXMap = mapViewpoint.x / mapViewpoint.scale;
    var viewpointCenterYMap = mapViewpoint.y / mapViewpoint.scale;
    var centerTileXIndex = Math.floor(viewpointCenterXMap / state.tileSize);
    var centerTileYIndex = Math.floor(viewpointCenterYMap / state.tileSize);
    var centerTileIndices = {x:centerTileXIndex, y:centerTileYIndex};
    var centerTileLeftMap = centerTileXIndex * state.tileSize;
    var centerTileTopMap = centerTileYIndex * state.tileSize;
    var centerTileLeftScreen = centerTileLeftMap - viewpointCenterXMap + mapDimensions.width / 2;
    var centerTileTopScreen = centerTileTopMap - viewpointCenterYMap + mapDimensions.height / 2;
    var screenCoords = {x:centerTileLeftScreen, y:centerTileTopScreen};
    state.set('centerTileScreenCoords', screenCoords);
    state.props.centerTileIndices.set(centerTileIndices);
  }

  var resetState = function(){
    updateBaselineScale();
    setImageTileLevel();
    setNumBasemapTiles();
    updateTileSize();
    updateCenterTileProps();
  }

  //load state change reactions ------------------------------------------------

  /*mapViewpoint.addListener('zoomEnd - basemapLayerReset', resetState);

  mapViewpoint.addListener('zoomAction', () => {
    updateTileSize();
    updateCenterTileProps();
  });

  mapViewpoint.addListener('panAction', () => {
    updateCenterTileProps();
  });

  mapViewpoint.addListener('zoomHomeAction', resetState);*/

  //init state -----------------------------------------------------------------

  updateBaselineScale();
  setImageTileLevel();
  setNumBasemapTiles();
  updateTileSize();
  updateCenterTileProps();

  //public api -----------------------------------------------------------------

  return state;

}
