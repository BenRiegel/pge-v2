//imports ----------------------------------------------------------------------

import ZoomControls from '../modules/zoom_controls/ZoomControls.js';
import dispatcher from '../services/Dispatcher.js';
import rootNode from './RootView.js';
import { zoom } from '../services/Dispatcher.js';


//module code block ------------------------------------------------------------

var zoomControls = new ZoomControls();

dispatcher.addListener('load', () => {
  zoomControls.addClickListener('zoomIn', () => {
    zoom('zoomIn');
  });
  zoomControls.addClickListener('zoomOut', () => {
    zoom('zoomOut');
  });
  zoomControls.addClickListener('zoomHome', () => {
    zoom('zoomHome');
  });
  rootNode.appendChild(zoomControls.rootNode);
});

dispatcher.addListener('zoomControls - enable', () => {
  zoomControls.enable();
});

dispatcher.addListener('zoomControls - disable', () => {
  zoomControls.disable();
});


//exports ----------------------------------------------------------------------

export default zoomControls;
