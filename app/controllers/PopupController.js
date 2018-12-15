//imports ----------------------------------------------------------------------

import appState from '../models/AppState.js';
import popup from '../views/PopupView.js';
import zoomControls from '../views/ZoomControlsView.js';
import { getProjectData } from '../models/ProjectsModel.js';

//module code block ------------------------------------------------------------

zoomControls.addListener('zoomAction', async type => {
  var num = Math.floor(Math.random() * 5);
  var projectData = await getProjectData(num);
  popup.setContent(projectData);
  //await new Promise(resolve => {
//    setTimeout(resolve, 500);
//  });
  //moving to location
  popup.open();
});

appState.loadingStatus.addListener('popup', async currentValue => {
  if (currentValue === 'inProgress'){
    popup.close();
    popup.enable();
  }
});
