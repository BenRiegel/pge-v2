//imports ----------------------------------------------------------------------

import NewEmitter from '../../../lib/Emitter.js';


//exports ----------------------------------------------------------------------

export default function NewEventsController(state, view){

  //private code block ---------------------------------------------------------

  var publicEmitter = NewEmitter();

  view.summary.addListener('closeAction', () => {
    state.expandedState.set('closed');
  });

  view.report.addListener('closeAction', () => {
    state.expandedState.set('closed');
  });

  view.summary.addListener('expandAction', () => {
    state.expandedState.set('open-expanded');
  });

  view.report.addListener('contractAction', () => {
    state.expandedState.set('open-contracted');
  });

  //public api -----------------------------------------------------------------

  return {
    addListener: publicEmitter.addListener,
  }
}
