//imports ----------------------------------------------------------------------

import loader from '../views/LoaderView.js';
import appState from '../models/AppState.js';


//module code block ------------------------------------------------------------

appState.loadingStatus.addListener('loader', async currentValue => {
  if (currentValue === 'starting'){
    loader.show();
  }
  if (currentValue === 'finished'){
    await loader.hide( {fadeOut:true} );
  }
});
