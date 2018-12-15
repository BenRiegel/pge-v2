//imports ----------------------------------------------------------------------

import appState from '../models/AppState.js';
import rootNode from '../views/RootView.js';
import loader from '../views/LoaderView.js';
import zoomControls from '../views/ZoomControlsView.js';
import selectMenu from '../views/SelectMenuView.js';
import popup from '../views/PopupView.js';
import graphicsLayer from '../views/GraphicsLayerView.js';


//module code block ------------------------------------------------------------

appState.loadingStatus.addListener('root', currentValue => {
  if (currentValue === 'starting'){
    rootNode.appendChild(loader.rootNode);
  }
  if (currentValue === 'inProgress'){
    rootNode.appendChild(zoomControls.rootNode);
    rootNode.appendChild(selectMenu.rootNode);
    rootNode.appendChild(popup.rootNode);
    rootNode.appendChild(graphicsLayer.rootNode);
  }
});
