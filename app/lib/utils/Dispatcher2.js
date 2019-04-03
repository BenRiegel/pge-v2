//imports ----------------------------------------------------------------------

import Emitter from './Emitter.js';


//exports ----------------------------------------------------------------------

export default function Dispatcher(){

  var actions = {};
  var listeners = {};

  //public api -----------------------------------------------------------------

  return {
    notify: function(target, actionName, ...args){
      var listener = listeners[target][actionName];
      if (listener){
        return listener(...args);
      } else {
        throw new Error(target + ' ' + actionName + ' listener is not found');
      }

    },
    defineAction: function(actionName, action){
      actions[actionName] = action.bind(this);
    },
    setListener: function(target, actionName, listener){
      var targetListeners = listeners[target] || {};
      targetListeners[actionName] = listener;
      listeners[target] = targetListeners;
    },
    doAction(actionName, ...args){
      var action = actions[actionName];
      if (action){
        return action(...args);
      } else {
        throw new Error(actionName + ' is not found');
      }

    },
  }

}
