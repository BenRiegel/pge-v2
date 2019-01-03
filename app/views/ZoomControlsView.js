//imports ----------------------------------------------------------------------

import ZoomControls from '../../modules/zoom_controls/ZoomControls.js';
import dispatcher from '../services/Dispatcher.js';
import { zoomStartRequest, zoomStopRequest } from '../controllers/DispatcherController.js';
import '../assets/stylesheets/zoom_controls.scss';


//module code block ------------------------------------------------------------

var zoomControls = new ZoomControls();

dispatcher.addListener('zoomControls', 'load', () => {
  zoomControls.addListener('in', 'buttonDown', () => {
    zoomStartRequest('in');
  });
  zoomControls.addListener('out', 'buttonDown', () => {
    zoomStartRequest('out');
  })
  zoomControls.addListener('in', 'buttonUp', zoomStopRequest);
  zoomControls.addListener('out', 'buttonUp', zoomStopRequest);
});


//exports ----------------------------------------------------------------------

export default zoomControls;
