//imports ----------------------------------------------------------------------

import * as modelController from './subcontrollers/ModelController.js';
import * as labelsController from './subcontrollers/LabelsController.js';
import * as loaderController from './subcontrollers/LoaderController.js';
import * as selectMenuController from './subcontrollers/SelectMenuController.js';
import * as graphicsLayerController from './subcontrollers/GraphicsLayerController.js';
import * as domController from './subcontrollers/ViewDomController.js';
import * as popupController from './subcontrollers/PopupController.js';
import * as rootController from './subcontrollers/RootController.js';
import view from '../view/View.js';
import { waitAtLeast } from '../lib/utils/Utils.js';


//module code block ------------------------------------------------------------

var { components } = view;
var { selectMenu, webMap, popupTemplate } = components;

selectMenu.setListener('newSelectedOption', newSelectedOption => {
  popupController.onNewSelectedOption();
  graphicsLayerController.onNewSelectedOption(newSelectedOption);
});

selectMenu.setListener('openingStart', () => {
  rootController.onActionStart();
  labelsController.showLabelIndents();
});

selectMenu.setListener('openingEnd', () => {
  rootController.onActionEnd();
});

selectMenu.setListener('closingStart', () => {
  rootController.onActionStart();
});

selectMenu.setListener('closingEnd', () => {
  rootController.onActionEnd();
  labelsController.hideLabelIndents();
});

webMap.setListener('actionStart', actionName => {
  rootController.onActionStart(actionName);
  selectMenuController.onActionStart();
});

webMap.setListener('actionEnd', actionName => {
  rootController.onActionEnd(actionName);
  selectMenuController.onActionEnd();
});

webMap.graphicsLayer.setListener('graphicsUpdateRequest', scale => {
  graphicsLayerController.onGraphicsUpdateRequest(scale);
});

//exports ----------------------------------------------------------------------

export async function initApp(){
  loaderController.startLoader();
  await waitAtLeast(1000, async () => {
    domController.load();
    await modelController.load();
    labelsController.load();
    selectMenuController.load();
    await graphicsLayerController.load();
  });
  await loaderController.terminateLoader();
}
