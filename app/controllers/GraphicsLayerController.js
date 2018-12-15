//imports ----------------------------------------------------------------------

import appState from '../models/AppState.js';
import { INIT_SELECTED_TAG } from '../config/Config.js';
import { getSelectedProjects } from '../models/ProjectsModel.js';
import { latLonToWebMercator } from '../services/WebMercator';
import graphicsLayer from '../views/GraphicsLayerView.js';


//module code block ------------------------------------------------------------

appState.loadingStatus.addListener('selectMenu', async currentValue => {
  if (currentValue === 'inProgress'){
    var selectedProjects = await getSelectedProjects(INIT_SELECTED_TAG);
  }
});
