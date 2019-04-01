//imports ----------------------------------------------------------------------

import Emitter from './Emitter.js';


//exports ----------------------------------------------------------------------

export default function Dispatcher(){

  var emitters = {
    model: new Emitter(),
    view: new Emitter(),
    public: new Emitter(),
  }

  var isEnabled = true;
  var isDispatching = false;
//  var isFrozen = false;

/*  var updateFrozenStatus = function(){
    var newValue = !isEnabled || isDispatching;
    if (newValue !== isFrozen){
      isFrozen = newValue;
      //emitters.dispatcher.notify('isFrozen', isFrozen);
    }
  }*/

  var setIsDispatching = function(newValue){
    if (newValue !== isDispatching){
      isDispatching = newValue;
      emitters.view.notify('actionInProgress', isDispatching);
      emitters.public.notify('actionInProgress', isDispatching);
    }
  }

  //public api -----------------------------------------------------------------

  return {
    isAsync: false,
    setListener: function(target, eventName, listener){
      emitters[target].setListener(eventName, listener);
    },
    enable: function(){
      isEnabled = true;
    },
    disable: function(){
      isEnabled = false;
    },
    newAction(eventName, ...args){
      this.isAsync = false;
      if (isEnabled && !isDispatching){
        emitters.model.notify(eventName, ...args);
        emitters.view.notify(eventName, ...args);
        emitters.public.notify(eventName, ...args);
      } else {
        console.log('error');
      }
    },
    async newAsyncAction(eventName, ...args){
      this.isAsync = true;
      if (isEnabled && !isDispatching){
        setIsDispatching(true);
        emitters.model.notify(eventName, ...args);
        await emitters.view.notify(eventName, ...args);
        emitters.public.notify(eventName, ...args);
        setIsDispatching(false);
      }
    }
  }

}
