//imports ----------------------------------------------------------------------

import { initApp } from './services/Dispatcher.js';
import './views/GraphicsLayerView.js';
import './views/BasemapLayerView.js';
import './views/SelectMenuView.js';
import './views/LoaderView.js';
import './views/PopupView.js';
import './views/ZoomControlsView.js';
import './controllers/MapMoveAnimator.js';
//import './controllers/PanController.js';
import './assets/stylesheets/index.scss';


//module code block ------------------------------------------------------------

initApp();
