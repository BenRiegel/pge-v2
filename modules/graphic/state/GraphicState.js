//imports ----------------------------------------------------------------------

import Emitter from '../../../lib/Emitter.js';
import { latLonToWebMercator } from '../../../lib/WebMercator.js';


//exports ----------------------------------------------------------------------

export default function GraphicState(props, mapViewpoint, mapProperties, layerState){

  var emitter = new Emitter();

  const MIN_RADIUS = 10;

  var state = {
    radius: 0,
    renderedRadius: MIN_RADIUS,
    scaleFactor: 1,
    numPts: 1,
    isMapped: false,
    isCovered: false,
    parentId: null,
    isHighlighted: false,
    worldCoords: latLonToWebMercator(props.geoCoords),
    screenCoords: {x:undefined, y:undefined},
  };

  state.addListener = emitter.addListener;

  state.reset = function(){
    this.radius = 0;
    this.renderedRadius = MIN_RADIUS;
    this.scaleFactor = 1;
    this.numPts = 1;
    this.isCovered = false;
    this.parentId = null;
    this.isHighlighted = false;
    this.worldCoords = latLonToWebMercator(props.geoCoords);
  }

  state.setWorldCoords = function(coords){
    this.worldCoords.x = coords.x;
    this.worldCoords.y = coords.y;
    emitter.broadcast('worldCoords');
    updateScreenCoords();
  }

  state.setIsCovered = function(parentId){
    this.isCovered = true;
    this.parentId = parentId;
    emitter.broadcast('isCovered');
  }

  state.setIsVisible = function(){
    this.isCovered = false;
    emitter.broadcast('isCovered');
  }

  state.setRadius = function(newRadius, newRenderedRadius){
    this.radius = newRadius;
    this.renderedRadius = newRenderedRadius;
    emitter.broadcast('radius');
  };

  state.setNum = function(newNum){
    this.numPts = newNum;
    emitter.broadcast('numPts');
  };

  var updateScale = function(){
    state.scaleFactor = Math.pow(2, mapViewpoint.coords.z - mapViewpoint.eventStartZ);
    emitter.broadcast('scaleFactor');
  }

  var updateIsMapped = function(){
    state.isMapped = props.tags.includes(layerState.selectedTag);
    emitter.broadcast('isMapped');
  }

  var updateScreenCoords = function(){
    var { pixelSize, pixelNum, leftMapCoord, topMapCoord } = mapProperties;
    state.screenCoords.x = state.worldCoords.x / pixelSize - leftMapCoord;
    state.screenCoords.x += (state.screenCoords.x < 0) ? pixelNum : 0;
    state.screenCoords.x -= (state.screenCoords.x > pixelNum) ? pixelNum : 0;
    state.screenCoords.y = state.worldCoords.y / pixelSize - topMapCoord;
    emitter.broadcast('screenCoords');
  };

  var panScreenCoords = function( {deltaXPx, deltaYPx} ){
    var pixelNum = mapProperties.pixelNum;
    state.screenCoords.x -= deltaXPx;
    state.screenCoords.x += (state.screenCoords.x < 0) ? pixelNum : 0;
    state.screenCoords.x -= (state.screenCoords.x > pixelNum) ? pixelNum : 0;
    state.screenCoords.y -= deltaYPx;
    state.screenCoords.y += (state.screenCoords.y < 0) ? pixelNum : 0;
    state.screenCoords.y -= (state.screenCoords.y > pixelNum) ? pixelNum : 0;
    emitter.broadcast('screenCoords');
  }

  //not happy with this
  var updateIsHighlighted = function(id){
    if (id === null){
      state.isHighlighted = false;
    } else {
      state.isHighlighted = (props.id === id || state.parentId === id);
    }
    emitter.broadcast('isHighlighted');
  }

  updateScreenCoords();

  mapViewpoint.addListener('graphic - updateOnPan', panScreenCoords);
  mapViewpoint.addListener('graphic - updateOnZoom', () => {
    updateScreenCoords();
    updateScale();
  });
  layerState.addListener('selectedTag', 'graphic', 'isMapped', updateIsMapped);
  layerState.addListener('highlightedGraphicId', 'graphic', 'isHighlighted', updateIsHighlighted);


  //public api -----------------------------------------------------------------

  return state;

}
