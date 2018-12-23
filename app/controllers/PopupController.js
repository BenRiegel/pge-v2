//imports ----------------------------------------------------------------------

import dispatcher from '../services/Dispatcher.js';
import popup from '../views/PopupView.js';


//module code block ------------------------------------------------------------

dispatcher.addListener('popup', 'load', () => {
  popup.close();
  popup.enable();
});

dispatcher.addListener('popup', 'loadProjectData', projectData => {
  popup.setContent(projectData);
});

dispatcher.addListener('popup', 'open', () => {
  popup.open();
});
