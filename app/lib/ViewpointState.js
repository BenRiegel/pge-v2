//imports ----------------------------------------------------------------------

import { XCoord, YCoord, Scale } from './Coords.js';
import Emitter from './Emitter.js';


//exports ----------------------------------------------------------------------

export default function ViewpointState(obj){

  var emitter = new Emitter();

  var keys = Object.keys(obj);

  var props = {
    action: obj.action,
    x: new XCoord(obj.x),
    y: new YCoord(obj.y),
    scale: new Scale(obj.scale),
  };

  var state = {

    addListener(sourceName, listener){
      emitter.addListener(sourceName, listener);
    },

    set(x, y, scale){
      props.x.set(x);
      props.y.set(y);
      props.scale.set(scale);
      if (props.action === 'zoom'){
        emitter.broadcast('zoomAction');
      } else if (props.action === 'pan'){
        emitter.broadcast('panAction');
      } else if (props.action === 'zoomHome'){
    //    await emitter.asyncBroadcast('zoomHomeAction');
      }
    },

    async startNewAction(actionName){
      props.action = actionName;
      if (props.action === 'zoomHome'){
        await emitter.asyncBroadcast('zoomHomeStart');
      }
    },

    async terminateAction(){
      var completedAction = props.action;
      props.action = null;
      if (completedAction === 'zoom'){
        emitter.broadcast('basemapLayer - copyTiles');
        await emitter.asyncBroadcast('zoomEnd - basemapLayerReset');
        emitter.broadcast('zoomEnd - graphicsLayerReset');
        await emitter.asyncBroadcast('basemapLayer - revealNewTiles');
      } else if (completedAction === 'zoomHome'){
        await emitter.asyncBroadcast('zoomHomeEnd');
      }
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
