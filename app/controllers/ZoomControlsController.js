//imports ----------------------------------------------------------------------

import dispatcher from '../services/Dispatcher.js';
import { pointSelect } from './DispatcherController.js';
import zoomControls from '../views/ZoomControlsView.js';


//module code block ------------------------------------------------------------

dispatcher.addListener('zoomControls', 'load', () => {
  zoomControls.addListener('home', 'buttonUp', pointSelect);
});
