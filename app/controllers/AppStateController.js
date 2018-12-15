//imports ----------------------------------------------------------------------

import appState from '../models/AppState.js';


//exports ----------------------------------------------------------------------

export async function initApp(){
  await appState.loadingStatus.set('starting');
  await appState.loadingStatus.set('inProgress');
  await new Promise(resolve => {
    setTimeout(resolve, 2000);
  });
  await appState.loadingStatus.set('finished');
};
