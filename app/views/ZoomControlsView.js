//imports ----------------------------------------------------------------------

import ZoomControls from '../../modules/zoom_controls/ZoomControls.js';
import dispatcher from '../services/Dispatcher.js';
import rootNode from './RootView.js';
import { zoom } from '../controllers/DispatcherController.js';
import '../assets/stylesheets/zoom_controls.scss';


//module code block ------------------------------------------------------------

var zoomControls = new ZoomControls();

dispatcher.addListener('zoomControls', 'load', () => {
  zoomControls.addClickListener('in', () => {
    zoom('in');
  });
  zoomControls.addClickListener('out', () => {
    zoom('out');
  });
  zoomControls.addClickListener('home', () => {
    zoom('home');
  });
  rootNode.appendChild(zoomControls.rootNode);
});

dispatcher.addListener('zoomControls', 'enable', () => {
  zoomControls.enable();
});

dispatcher.addListener('zoomControls', 'disable', () => {
  zoomControls.disable();
});


//exports ----------------------------------------------------------------------

export default zoomControls;
