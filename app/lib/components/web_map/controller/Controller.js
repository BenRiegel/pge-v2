//imports ----------------------------------------------------------------------

import EmitterController from './subcontrollers/EmitterController.js';
import PanDispatcherController from './subcontrollers/PanDispatcherController.js';
import ModelController from './subcontrollers/ModelController.js';
import ViewInputController from './subcontrollers/ViewInputController.js';
import ViewOutputController from './subcontrollers/ViewOutputController.js';
import ViewDomController from './subcontrollers/ViewDomController.js';


//exports ----------------------------------------------------------------------

export default function WebMapController(config, emitter, model, view){

  var { subcomponents } = view;
  var { graphicsLayer, zoomControls, popup } = subcomponents;

  //declare subcontrollers -----------------------------------------------------

  var emitterController = new EmitterController(emitter, model);
  var panController = new PanDispatcherController(view);
  var modelController = new ModelController(model, config);
  var domController = new ViewDomController(view);
  var inputController = new ViewInputController(view, model);
  var outputController = new ViewOutputController(view, model);

  //load event listeners -------------------------------------------------------

  graphicsLayer.setListener('pointGraphicClicked', async (id, worldCoords, attributes) => {
    inputController.disableAll();
    modelController.panTo(worldCoords);
    await outputController.onPointGraphicSelected(id, attributes);
    inputController.enableAll();
  });

  graphicsLayer.setListener('clusterGraphicClicked', async (id, worldCoords) => {
    inputController.disableAll();
    modelController.zoomTo(worldCoords);
    await outputController.onClusterGraphicSelected(id);
    inputController.enableAll();
  });

  zoomControls.setListener('zoomInRequest', async () => {
    inputController.disableAll();
    modelController.zoomIn();
    await outputController.onZoomInOutRequest();
//    emitterController.notifyOnAnimateEnd();
    inputController.enableAll();
  });

  zoomControls.setListener('zoomOutRequest', async () => {
    inputController.disableAll();
    modelController.zoomOut();
    await outputController.onZoomInOutRequest();
  //  emitterController.notifyOnAnimateEnd();
    inputController.enableAll();
  });

  zoomControls.setListener('zoomHomeRequest', async () => {
    inputController.disableAll();
    modelController.zoomHome();
    await outputController.onZoomHomeRequest();
    inputController.enableAll();
  });

  popup.setListener('closed', () => {
    outputController.onPopupClose();
  });

  //public api -----------------------------------------------------------------

  this.enable = inputController.enable;

  this.disable = inputController.disable;

  this.configure = outputController.configure();
}
