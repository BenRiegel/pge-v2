//imports ----------------------------------------------------------------------

import Emitter from './Emitter.js';


//exports ----------------------------------------------------------------------

export default function Dispatcher(){

  var emitters = {
    model: new Emitter(),
    view: new Emitter(),
    public: new Emitter(),
  }

  var isDispatching = false;

  var setIsDispatching = function(newValue){
    if (newValue !== isDispatching){
      isDispatching = newValue;
      emitters.view.notify('privateActionUpdate', isDispatching);
      emitters.public.notify('privateActionUpdate', isDispatching);
    }
  }

  //public api -----------------------------------------------------------------

  return {
    setListener: function(target, actionName, listener){
      emitters[target].setListener(actionName, listener);
    },
    newAction(actionName, ...args){
      if (!isDispatching){
        emitters.model.notify(actionName, ...args);
        emitters.view.notify(actionName, ...args);
        emitters.public.notify(actionName, ...args);
      } else {
        console.log('error', actionName, 'rejected');
      }
    },
    async newAsyncAction(actionName, ...args){
      if (!isDispatching){
        setIsDispatching(true);
        emitters.model.notify(actionName, ...args);
        await emitters.view.notify(actionName, ...args);
        emitters.public.notify(actionName, ...args);
        setIsDispatching(false);
      }
    }
  }

}
