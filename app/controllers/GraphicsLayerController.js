//imports ----------------------------------------------------------------------

import dispatcher from '../services/Dispatcher.js';
import { INIT_SELECTED_TAG } from '../config/Config.js';
import { getSelectedProjects } from '../stores/ProjectsModel.js';
//import { latLonToWebMercator } from '../services/WebMercator';
import graphicsLayer from '../views/GraphicsLayerView.js';


//module code block ------------------------------------------------------------

dispatcher.addListener('graphicsLayer', 'load', async () => {
  var selectedProjects = await getSelectedProjects(INIT_SELECTED_TAG);
});

dispatcher.addListener('graphicsLayer', 'filterGraphics', selectedTag => {
  console.log('new selected tag =', selectedTag);
});
