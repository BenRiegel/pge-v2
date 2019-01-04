import { latLonToWebMercator } from '../../../lib/WebMercator.js';





export default function GraphicState(props, mapViewpoint, mapProperties, layerState){

  var worldCoords = latLonToWebMercator(props.geoCoords);

  var listeners = {};

  var broadcast = function(eventName, ...args){
    var listener = listeners[eventName];
    if (listener){
      listener(...args);
    }
  }

  var state = {
    type: 'point',
    radius: 8.5,
    isSelected: true,
    parentGraphic: null,
    combinedGraphics: null,
    worldCoords: {x:worldCoords.x, y:worldCoords.y},
    screenCoords: {x:undefined, y:undefined},
    get isCombined(){
      return this.parentGraphic;
    },
    get num(){
      return this.combinedGraphics.length;
    },
    get isVisible(){
      return (this.isSelected && !this.isCombined)
    }
  }

  state.combinedGraphics = [state];

  state.reset = function(){
    this.type = 'point';
    this.radius = 8.5;
    this.parentGraphic = null,
    this.combinedGraphics = [this];
    this.worldCoords = {x:worldCoords.x, y:worldCoords.y};
    this.updateScreenCoords();
  }

  state.addListener = function(eventName, listener){
    listeners[eventName] = listener;
  }

  state.updateScreenCoords = function(){
    var { pixelSize, pixelNum, leftMapCoord, topMapCoord } = mapProperties;
    this.screenCoords.x = this.worldCoords.x / pixelSize - leftMapCoord;
    this.screenCoords.x += (this.screenCoords.x < 0) ? pixelNum : 0;
    this.screenCoords.x -= (this.screenCoords.x > pixelNum) ? pixelNum : 0;
    this.screenCoords.y = this.worldCoords.y / pixelSize - topMapCoord;
  };

  var updateIsSelected = function(selectedTag){
    state.isSelected = props.tags.includes(selectedTag);
  };

  var panScreenCoords = function( {deltaXPx, deltaYPx} ){
    var pixelNum = mapProperties.pixelNum;
    state.screenCoords.x -= deltaXPx;
    state.screenCoords.x += (state.screenCoords.x < 0) ? pixelNum : 0;
    state.screenCoords.x -= (state.screenCoords.x > pixelNum) ? pixelNum : 0;
    state.screenCoords.y -= deltaYPx;
    state.screenCoords.y += (state.screenCoords.y < 0) ? pixelNum : 0;
    state.screenCoords.y -= (state.screenCoords.y > pixelNum) ? pixelNum : 0;
    broadcast('view - updateScreenCoords');
  }

  state.updateScreenCoords();

  mapViewpoint.addListener('graphic - updateOnPan', panScreenCoords);

  layerState.addListener('selectedTag', 'graphicState', 'isSelected', updateIsSelected);

  //public api -----------------------------------------------------------------

  return state;

}
