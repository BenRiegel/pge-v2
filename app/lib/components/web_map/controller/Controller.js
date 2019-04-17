//imports ----------------------------------------------------------------------

import EmitterController from './subcontrollers/EmitterController.js';
import ModelController from './subcontrollers/ModelController.js';
import ViewInputController from './subcontrollers/ViewInputController.js';
import ViewOutputController from './subcontrollers/ViewOutputController.js';
import ViewDomController from './subcontrollers/ViewDomController.js';


//exports ----------------------------------------------------------------------

export default function WebMapController(config, emitter, model, view){

  var { subcomponents } = view;
  var { graphicsLayer, basemapLayer, zoomControls, popup } = subcomponents;

  //declare subcontrollers -----------------------------------------------------

  var emitterController = new EmitterController(emitter, model);
  var modelController = new ModelController(model, config);
  var domController = new ViewDomController(view);
  var inputController = new ViewInputController(view);
  var outputController = new ViewOutputController(view, model);

  //load event listeners -------------------------------------------------------

  graphicsLayer.setListener('pointGraphicClicked', async (id, worldCoords, attributes) => {
    emitterController.notifyActionStart('graphicSelected');
    inputController.disableAll();
    modelController.panTo(worldCoords);
    await outputController.onPointGraphicSelected(id, attributes);
    inputController.enableAll();
    emitterController.notifyActionEnd('graphicSelected');
  });

  graphicsLayer.setListener('clusterGraphicClicked', async (id, worldCoords) => {
    emitterController.notifyActionStart('graphicSelected');
    inputController.disableAll();
    modelController.zoomTo(worldCoords);
    await outputController.onClusterGraphicSelected(id);
    inputController.enableAll();
    emitterController.notifyActionEnd('graphicSelected');
  });

  zoomControls.setListener('zoomInRequest', async () => {
    inputController.disableAll();
    modelController.zoomIn();
    emitterController.onZoomStart();
    await outputController.onZoomInOutRequest();
    emitterController.onZoomEnd();
    inputController.enableAll();
  });

  zoomControls.setListener('zoomOutRequest', async () => {
    inputController.disableAll();
    modelController.zoomOut();
    emitterController.onZoomStart();
    await outputController.onZoomInOutRequest();
    emitterController.onZoomEnd();
    inputController.enableAll();
  });

  zoomControls.setListener('zoomHomeRequest', async () => {
    inputController.disableAll();
    modelController.zoomHome();
    emitterController.onZoomStart();
    await outputController.onZoomHomeRequest();
    emitterController.onZoomEnd();
    inputController.enableAll();
  });

  popup.setListener('closed', () => {
    outputController.onPopupClose();
  });

  basemapLayer.setListener('panStart', () => {
    inputController.onPanStart();
    modelController.onPanStart();
    emitterController.notifyActionStart('pan');
    outputController.onPanStart();
  });

  basemapLayer.setListener('panEnd', () => {
    inputController.onPanEnd();
    outputController.onPanEnd();
    emitterController.notifyActionEnd('pan');
  });

  basemapLayer.setListener('pan', changes => {
    modelController.pan(changes);
    outputController.onPan(changes);
  });

  //public api -----------------------------------------------------------------

  this.enable = inputController.enableAll;

  this.disable = inputController.disableAll;

  this.configure = outputController.configure();
}
