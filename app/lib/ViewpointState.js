//imports ----------------------------------------------------------------------

import { XCoord, YCoord, Scale } from './Coords.js';
import Emitter from './Emitter.js';


//exports ----------------------------------------------------------------------

export default function ViewpointState(obj){

  var emitter = new Emitter();

  var keys = Object.keys(obj);

  var props = {
    x: new XCoord(obj.x),
    y: new YCoord(obj.y),
    scale: new Scale(obj.scale),
  };

  var state = {
    addListener(sourceName, listener){
      emitter.addListener(sourceName, listener);
    },
    notify(listenerName, ...args){
      emitter.broadcast(listenerName, ...args);
    },
    onChange: null,
    set(x, y, scale){
      props.x.set(x);
      props.y.set(y);
      props.scale.set(scale);
      if (this.onChange){
        this.onChange();
      }
    },
    propHasChanged(propName){
      return props[propName].hasChanged;
    },
    getChangeSummary(propName, newValue){
      return props[propName].getChangeSummary(newValue);
    }
  };

  for (let key of keys){
    Object.defineProperty(state, key, {
      get: function() {
             return props[key].value;
           },
    });
  }

  return state;
}
