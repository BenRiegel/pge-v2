import { latLonToWebMercator } from '../../../lib/WebMercator.js';



export default function GraphicState(props, mapProperties, layerState){

  var worldCoords = latLonToWebMercator(props.geoCoords);

  var state = {
    type: 'point',
    radius: 8.5,
    isSelected: true,
    parentGraphic: null,
    combinedGraphics: null,
    worldCoords,
    screenCoords: {x:undefined, y:undefined},
    get isCombined(){
      return this.parentGraphic;
    },
    get num(){
      return this.combinedGraphics.length;
    }
  }

  state.combinedGraphics = [state];

  state.reset = function(){
    this.type = 'point';
    this.radius = 8.5;
    this.parentGraphic = null,
    this.combinedGraphics = [this];
    this.worldCoords = worldCoords;
  }

  state.onUpdate = null;

  state.update = function(){
    if (state.onUpdate){
      state.onUpdate();
    }
  }

  var updateIsSelected = function(selectedTag){
    state.isSelected = props.tags.includes(selectedTag);
  };

  state.updateScreenCoords = function(){
    var { pixelSize, pixelNum, leftMapCoord, topMapCoord } = mapProperties;
    this.screenCoords.x = this.worldCoords.x / pixelSize - leftMapCoord;
    this.screenCoords.x += (this.screenCoords.x < 0) ? pixelNum : 0;
    this.screenCoords.x -= (this.screenCoords.x > pixelNum) ? pixelNum : 0;
    this.screenCoords.y = this.worldCoords.y / pixelSize - topMapCoord;
  };

  state.panScreenCoords = function( {deltaXPx, deltaYPx, numPixels} ){
    this.screenCoords.x -= deltaXPx;
    this.screenCoords.x += (this.screenCoords.x < 0) ? numPixels : 0;
    this.screenCoords.x -= (this.screenCoords.x > numPixels) ? numPixels : 0;
    this.screenCoords.y -= deltaYPx;
    this.screenCoords.y += (this.screenCoords.y < 0) ? numPixels : 0;
    this.screenCoords.y -= (this.screenCoords.y > numPixels) ? numPixels : 0;
  }

  state.updateScreenCoords();

  layerState.addListener('selectedTag', 'graphicState', 'isSelected', updateIsSelected);

  //public api -----------------------------------------------------------------

  return state;

}
