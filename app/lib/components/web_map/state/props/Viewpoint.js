//imports ----------------------------------------------------------------------

import { XCoord, YCoord, Scale } from './Coords.js';
import { lonToWebMercatorX, latToWebMercatorY } from '../../lib/WebMercator.js';
import { levelToValue } from '../../lib/WebMapScale.js';
import Emitter from '../../../../utils/Emitter.js';


//exports ----------------------------------------------------------------------

export default function WebMapState(initProps){

  var { initCoords, initScaleLevel } = initProps;

  var initState = {
    x: lonToWebMercatorX(initCoords.lon),
    y: latToWebMercatorY(initCoords.lat),
    scale: initScaleLevel,
  }

  var emitter = new Emitter();

  var props = {
    x: new XCoord(initState.x),
    y: new YCoord(initState.y),
    scale: new Scale(initState.scale),
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
      set('zoomHome', initState.x, initState.y, initState.scale);
    },
    zoomIn: function(){
      set('zoomIn', props.x.value, props.y.value, props.scale.value + 1);
    },
    zoomOut: function(){
      set('zoomOut', props.x.value, props.y.value, props.scale.value - 1);
    },
    zoomTo: async function( {x, y} ){
      await set('zoomTo', x, y, props.scale.value + 1);
    },
    panTo: async function( {x, y} ){
      await set('panTo', x, y, props.scale.value);
    },
    pan: function(xPx, yPx){

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
    get scaleValue(){
      return levelToValue(props.scale.value);
    }
  }

  //public api -----------------------------------------------------------------

  return state;

}
