//imports ----------------------------------------------------------------------

import XCoord from './props/XCoord.js';
import YCoord from './props/YCoord.js';
import ScaleCoord from './props/ScaleCoord.js';
import Emitter from '../../../utils/Emitter.js';
import { calculateDeltaX } from '../../../web_mapping/WebMercator.js';


//exports ----------------------------------------------------------------------

export default function WebMapState(initProps){

  var { initCoords, initScale, mapDimensions } = initProps;

  var emitter = new Emitter();

  var action = {
    type: null,
    initCoords: null,
    zoomScaleFactor: 1,
    updateProps: function(currentScale){
      if (this.type === 'zoom'){
        this.zoomScaleFactor = this.initCoords.scale / currentScale;
      }
    }
  }

  var coords = {
    x: new XCoord(initCoords.x),
    y: new YCoord(initCoords.y),
    scale: new ScaleCoord(initScale),
  };

  var state = {
    addListener: function(eventName, callback){
      emitter.addListener(eventName, callback);
    },
    removeListener: function(eventName, callback){
      emitter.removeListener(eventName, callback);
    },
    beginAction: function(type){
      action.type = type;
      action.initCoords = {x:coords.x.value, y:coords.y.value, scale:coords.scale.value};
      action.zoomScaleFactor = 1;
      var eventName = `${action.type}Begin`;
      return emitter.asyncBroadcast(eventName);
    },
    endAction: function(){
      var eventName = `${action.type}End`;
      action.type = null;
      action.initCoords = null;
      action.zoomScaleFactor = null;
      return emitter.asyncBroadcast(eventName);
    },
    set: function(x, y, scale){
      coords.x.set(x);
      coords.y.set(y);
      coords.scale.set(scale);
      action.updateProps(coords.scale.value);
      var eventName = `${action.type}Update`;
      emitter.broadcast(eventName);
    },
    getChangeSummary: function(actionType, worldCoords){
      const ZOOM_IN_SCALER = 0.5;
      const ZOOM_OUT_SCALER = 2;
      switch (actionType){
        case 'zoomIn':
          var newX = coords.x.value;
          var newY = coords.y.value;
          var newScale = coords.scale.value * ZOOM_IN_SCALER;
          break;
        case 'zoomOut':
          var newX = coords.x.value;
          var newY = coords.y.value;
          var newScale = coords.scale.value * ZOOM_OUT_SCALER;
          break;
        case 'zoomHome':
          var newX = initCoords.x;
          var newY = initCoords.y;
          var newScale = initScale;
          break;
        case 'panTo':
          var newX = worldCoords.x;
          var newY = worldCoords.y;
          var newScale = coords.scale.value;
          break;
        case 'zoomTo':
          var newX = worldCoords.x;
          var newY = worldCoords.y;
          var newScale = coords.scale.value * ZOOM_IN_SCALER;
          break;
        default:
          break;
      }
      return {
        x: coords.x.getChangeSummary(newX),
        y: coords.y.getChangeSummary(newY),
        scale: coords.scale.getChangeSummary(newScale),
      }
    },
    calculateScreenCoords(worldCoords){
      var deltaX = calculateDeltaX(worldCoords.x, coords.x.value);
      var deltaXMap = deltaX / coords.scale.value;
      var screenX = deltaXMap + mapDimensions.width / 2;
      var deltaY = worldCoords.y - coords.y.value;
      var deltaYMap = deltaY / coords.scale.value;
      var screenY = deltaYMap + mapDimensions.height / 2;
      return {x:screenX, y:screenY};
    },
    get x(){
      return coords.x.value;
    },
    get y(){
      return coords.y.value;
    },
    get scale(){
      return coords.scale.value;
    },
    get zoomScaleFactor(){
      return action.zoomScaleFactor;
    },
  }

  //public api -----------------------------------------------------------------

  return state;

}
