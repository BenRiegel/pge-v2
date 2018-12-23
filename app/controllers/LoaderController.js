//imports ----------------------------------------------------------------------

import dispatcher from '../services/Dispatcher.js';
import loader from '../views/LoaderView.js';


//module code block ------------------------------------------------------------

dispatcher.addListener('loader', 'startLoading', () => {
  loader.show();
});

dispatcher.addListener('loader', 'finishLoading', async () => {
  await loader.fadeOutAndHide();
});
