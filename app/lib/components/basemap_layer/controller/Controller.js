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

  var emitterController =  new EmitterController(emitter);
  var modelController = new ModelController(model, webMapModel);
  var viewController = new ViewController(view, model);
  var outputController = new ViewOutputController(view, model, webMapModel, webMapDimensions);
  var inputController = new ViewInputController(view);
  var domController = new ViewDomController(view);

  //public api -----------------------------------------------------------------

  this.enable = inputController.enable;

  this.disable = inputController.disable;

  this.configure = function(){
    modelController.updateProps();
    modelController.setLayerDimensions(webMapDimensions);
    viewController.createTiles();
    domController.loadTiles();
    return outputController.onConfigure();
  };

  this.updateOnPan = outputController.updateOnPan;

  this.updateOnPanEnd = function(){
    return outputController.updateOnPanEnd();
  };

  this.updateOnZoom = outputController.updateOnZoom;

  this.updateOnZoomEnd = function(){
    modelController.updateProps();
    return outputController.updateOnZoomEnd();
  };

  this.updateOnZoomHome = function(){
    modelController.updateProps();
    return outputController.updateOnZoomHome();
  };

  this.fadeDown = outputController.fadeDown;

  this.fadeUp = outputController.fadeUp;

}
