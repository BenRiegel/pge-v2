//imports ----------------------------------------------------------------------

import ModelController from './subcontrollers/ModelController.js';
import ViewController from './subcontrollers/ViewController.js';
import ViewInputController from './subcontrollers/ViewInputController.js';
import ViewDomController from './subcontrollers/ViewDomController.js';
import ViewOutputController from './subcontrollers/ViewOutputController.js';
import EmitterController from './subcontrollers/EmitterController.js';


//exports ----------------------------------------------------------------------

export default function BasemapLayerController(emitter, model, view, webMapModel, webMapDimensions){

  //declare subcontrollers -----------------------------------------------------

  var emitterController =  new EmitterController(emitter, view);
  var modelController = new ModelController(model, webMapModel);
  var viewController = new ViewController(view, model);
  var outputController = new ViewOutputController(view, model);
  var inputController = new ViewInputController(view);
  var domController = new ViewDomController(view, model);

  //public api -----------------------------------------------------------------

  this.enable = inputController.enable;

  this.disable = inputController.disable;

  this.configure = function(){
    modelController.updateImageTileLevel();
    modelController.updateBasemapDimensions();
    modelController.setLayerDimensions(webMapDimensions);
    modelController.setMacroOffset(webMapDimensions);
    modelController.updateMicroOffset();
    modelController.updateTileIndices();
    modelController.resetPanOffset();
    viewController.createTiles();
    domController.loadTiles();
    return outputController.onConfigure();
  };

  this.updateOnPan = function(cumulativePan){
    modelController.updatePanOffset(cumulativePan);
    outputController.updateOnPan();
  };

  this.updateOnPanEnd = function(){
    modelController.updateMicroOffset();
    modelController.updateTileIndices();
    modelController.resetPanOffset();
    return outputController.updateOnPanEnd();
  };

  this.updateOnZoom = function(cumulativePan, zoomScaleFactor){
    modelController.updateScaleFactor(zoomScaleFactor);
    modelController.updatePanOffset(cumulativePan);
    outputController.updateOnZoom();
  };

  this.updateOnZoomEnd = function(){
    modelController.updateImageTileLevel();
    modelController.updateBasemapDimensions();
    modelController.updateMicroOffset();
    modelController.updateTileIndices();
    modelController.updateScaleFactor(1);
    modelController.resetPanOffset();
    return outputController.updateOnZoomEnd();
  };

  this.updateOnZoomHome = function(){
    modelController.updateImageTileLevel();
    modelController.updateBasemapDimensions();
    modelController.updateMicroOffset();
    modelController.updateTileIndices();
    modelController.updateScaleFactor(1);
    modelController.resetPanOffset();
    return outputController.updateOnZoomHome();
  };

  this.fadeDown = outputController.fadeDown;

  this.fadeUp = outputController.fadeUp;

}
