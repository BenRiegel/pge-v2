//imports ----------------------------------------------------------------------

import dispatcher from '../services/Dispatcher.js';
import loader from './LoaderView.js';
import zoomControls from './ZoomControlsView.js';
import selectMenu from './SelectMenuView.js';
import popup from './PopupView.js';
import graphicsLayer from './GraphicsLayerView.js';
import '../assets/stylesheets/root.scss';


//module code block ------------------------------------------------------------

var rootNode = document.getElementById('root');

dispatcher.addListener('root', 'startLoading', () => {
  rootNode.appendChild(loader.rootNode);
});

dispatcher.addListener('root', 'load', () => {
  rootNode.appendChild(zoomControls.rootNode);
  rootNode.appendChild(selectMenu.rootNode);
  rootNode.appendChild(popup.rootNode);
  rootNode.appendChild(graphicsLayer.rootNode);
});


//exports ----------------------------------------------------------------------

export default rootNode;

export var mapDimensions = rootNode.getBoundingClientRect();
