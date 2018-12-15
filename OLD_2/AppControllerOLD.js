//imports ----------------------------------------------------------------------

import loader from '../views/LoaderView.js';
import selectMenuIsLoaded  from './SelectMenuController.js';
import zoomControlsIsLoaded from './ZoomControlsController.js';
import popupIsLoaded from './PopupController.js';
import graphicsLayerIsLoaded from './GraphicsLayerController.js';
import './MapViewpointController.js';
import * as root from '../views/RootView.js';


//module code block ------------------------------------------------------------

var startLoading = function(){
  loader.show();
  root.insertComponents( [loader] );
}

var loadComponents = async function(){
  await Promise.all( [selectMenuIsLoaded,
                      zoomControlsIsLoaded,
                      popupIsLoaded,
                      graphicsLayerIsLoaded] ).then( components => {
    root.insertComponents(components);
  });
  await new Promise(resolve => {
    setTimeout(resolve, 2000);
  });
}

var endLoading = async function(){
  await loader.hide( {fadeOut:true} );
  root.removeComponent(loader);
}

//exports ----------------------------------------------------------------------

export async function init(){
  startLoading();
  await loadComponents();
  await endLoading();
}
