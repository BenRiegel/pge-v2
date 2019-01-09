//imports ----------------------------------------------------------------------

import ZoomControls from '../../modules/zoom_controls/ZoomControls.js';
import dispatcher from '../services/Dispatcher.js';
import { zoom, zoomHome } from '../controllers/DispatcherController.js';
import '../assets/stylesheets/zoom_controls.scss';


//module code block ------------------------------------------------------------

var zoomControls = new ZoomControls();

dispatcher.addListener('zoomControls', 'load', () => {
  zoomControls.addClickListener('in', zoom);
  zoomControls.addClickListener('out', zoom);
  zoomControls.addClickListener('home', zoomHome);
});

dispatcher.addListener('zoomControls', 'enable', () => {
  zoomControls.enable();
});

dispatcher.addListener('zoomControls', 'disable', () => {
  zoomControls.disable();
});


//exports ----------------------------------------------------------------------

export default zoomControls;
