//imports ----------------------------------------------------------------------

import NewEmitter from '../../../lib/Emitter.js';


//exports ----------------------------------------------------------------------

export default function NewEventsController(state, container){

  //private code block ---------------------------------------------------------

  var publicEmitter = NewEmitter();

  container.addListener('menuClicked', async optionClicked => {
    if (state.isEnabled){
      publicEmitter.broadcast('processingStart');
      state.isEnabled = false;
      state.selectedOptionKey.set(optionClicked);
      await state.isOpen.set(!state.isOpen.value);
      state.isEnabled = true;
      publicEmitter.broadcast('processingEnd');
      if (state.selectedOptionKey.hasChanged){
        publicEmitter.broadcast('newSelectedOptiion', optionClicked);
      }
    }
  });

  //public api -----------------------------------------------------------------

  return {
    addListener: publicEmitter.addListener,
  }

}
