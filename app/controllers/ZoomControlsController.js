//imports ----------------------------------------------------------------------

import appState from '../models/AppState.js';
import zoomControls from '../views/ZoomControlsView.js';


//module code block ------------------------------------------------------------

appState.loadingStatus.addListener('zoomControls', async currentValue => {
  if (currentValue === 'inProgress'){
    zoomControls.enable();
  }
});
