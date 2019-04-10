//imports ----------------------------------------------------------------------

import * as modelController from './subcontrollers/ModelController.js';
import * as labelsController from './subcontrollers/LabelsController.js';
import * as loaderController from './subcontrollers/LoaderController.js';
import * as selectMenuController from './subcontrollers/SelectMenuController.js';
import * as graphicsLayerController from './subcontrollers/GraphicsLayerController.js';
import * as domController from './subcontrollers/ViewDomController.js';
import * as popupController from './subcontrollers/PopupController.js';
import { waitAtLeast } from '../lib/utils/Utils.js';


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
