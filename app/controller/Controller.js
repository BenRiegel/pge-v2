//imports ----------------------------------------------------------------------

import * as modelController from './subcontrollers/ModelController.js';
import * as labelsController from './subcontrollers/LabelsController.js';
import * as loaderController from './subcontrollers/LoaderController.js';
import * as selectMenuController from './subcontrollers/SelectMenuController.js';
import * as graphicsLayerController from './subcontrollers/GraphicsLayerController.js';
import * as domController from './subcontrollers/ViewDomController.js';
import * as popupController from './subcontrollers/PopupController.js';
import view from '../view/View.js';
import { waitAtLeast } from '../lib/utils/Utils.js';


//module code block ------------------------------------------------------------

var { components } = view;
var { selectMenu, webMap, popupTemplate, popupReport } = components;

selectMenu.setListener('newSelectedOption', newSelectedOption => {
  popupController.onNewSelectedOption();
  graphicsLayerController.onNewSelectedOption(newSelectedOption);
});

popupTemplate.setListener('readMoreRequest', async () => {
  selectMenu.disable();
  webMap.disable();
  popupController.onReadMoreRequest();
});

popupReport.setListener('closeRequest', () => {
  popupController.onCloseRequest();
  selectMenu.enable();
  webMap.enable();
});

popupReport.setListener('contractRequest', async () => {
  await popupController.onContractRequest();
  selectMenu.enable();
  webMap.enable();
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
