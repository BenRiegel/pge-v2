//imports ----------------------------------------------------------------------

import { initApp } from './controllers/DispatcherController.js';
import './views/GraphicsLayerView.js';
import './views/BasemapLayerView.js';
import './views/SelectMenuView.js';
import './views/LoaderView.js';
import './views/PopupView.js';
import './views/ZoomControlsView.js';
import './services/ZoomController.js';
import './services/MapMoveAnimator.js';
import './assets/stylesheets/index.scss';


//module code block ------------------------------------------------------------

initApp();
