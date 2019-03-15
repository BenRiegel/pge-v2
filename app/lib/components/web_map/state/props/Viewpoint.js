//imports ----------------------------------------------------------------------

import { XCoord, YCoord, Scale } from './Coords.js';
import Emitter from '../../../../utils/Emitter.js';
import { calculateDeltaX } from '../../../../web_mapping/WebMercator.js';


//exports ----------------------------------------------------------------------

export default function WebMapState(initProps){

  var { initCoords, initScale, mapDimensions } = initProps;

  var emitter = new Emitter();

  var props = {
    x: new XCoord(initCoords.x),
    y: new YCoord(initCoords.y),
    scale: new Scale(initScale),
  };

  var set = async function(actionName, x, y, scale){
    props.x.set(x);
    props.y.set(y);
    props.scale.set(scale);
    await emitter.asyncBroadcast(actionName);
  }

  var state = {
    props,
    addEventListener: function(eventName, callback){
      emitter.addListener(eventName, callback);
    },
    zoomHome: function(){
      set('zoomHome', initCoords.x, initCoords.y, initScale);
    },
    zoomIn: function(){
      set('zoomIn', props.x.value, props.y.value, props.scale.value * 0.5);
    },
    zoomOut: function(){
      set('zoomOut', props.x.value, props.y.value, props.scale.value * 2);
    },
    zoomTo: async function( {x, y} ){
      await set('zoomTo', x, y, props.scale.value * 0.5);
    },
    panTo: async function( {x, y} ){
      await set('panTo', x, y, props.scale.value);
    },
    pan: function(xPx, yPx){

    },
    calculateScreenCoords(worldCoords){
      var deltaX = calculateDeltaX(worldCoords.x, props.x.value);
      var deltaXMap = deltaX / props.scale.value;
      var screenX = deltaXMap + mapDimensions.width / 2;
      var deltaY = worldCoords.y - props.y.value;
      var deltaYMap = deltaY / props.scale.value;
      var screenY = deltaYMap + mapDimensions.height / 2;
      return {x:screenX, y:screenY};
    },
    calculateScreenCoordsViewpoint(worldCoords, viewpoint){
      var deltaX = calculateDeltaX(worldCoords.x, viewpoint.x);
      var deltaXMap = deltaX / viewpoint.scale;
      var screenX = deltaXMap + mapDimensions.width / 2;
      var deltaY = worldCoords.y - viewpoint.y;
      var deltaYMap = deltaY / viewpoint.scale;
      var screenY = deltaYMap + mapDimensions.height / 2;
      return {x:screenX, y:screenY};
    },

    get canZoomHome(){
      var zoomLevelDiff = Math.log2(props.scale.previousValue / props.scale.value);
      return (zoomLevelDiff > -2);
    },


    get x(){
      return props.x.value;
    },
    get y(){
      return props.y.value;
    },
    get scale(){
      return props.scale.value;
    },
  }

  //public api -----------------------------------------------------------------

  return state;

}
