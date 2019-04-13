//imports ----------------------------------------------------------------------

import ModelController from './subcontrollers/ModelController.js';
import ViewController from './subcontrollers/ViewController.js';
import ViewDomController from './subcontrollers/ViewDomController.js';
import ViewOutputController from './subcontrollers/ViewOutputController.js';
import ViewInputController from './subcontrollers/ViewInputController.js';
import EmitterController from './subcontrollers/EmitterController.js';


//exports ----------------------------------------------------------------------

export default function GraphicsLayerController(emitter, model, view, webMapModel, webMapDimensions){

  //declare subcontrollers -----------------------------------------------------

  var emitterController = new EmitterController(emitter, view);
  var modelController = new ModelController(model);
  var viewController = new ViewController(view);
  var outputController = new ViewOutputController(view, model, webMapModel, webMapDimensions);
  var inputController = new ViewInputController(view);
  var domController = new ViewDomController(view);

  //public api -----------------------------------------------------------------

  this.selectGraphic = function(graphicId){
    modelController.selectGraphic(graphicId);
    outputController.updateOnGraphicSelection();
  };

  this.unselectGraphic = function(){
    modelController.selectGraphic(null);
    outputController.updateOnGraphicSelection();
  };

  this.enable = inputController.enable;

  this.disable = inputController.disable;

  this.addGraphics = function(graphics){
    viewController.addGraphics(graphics);
    domController.addGraphics(graphics);
    outputController.renderGraphics(graphics);
  };

  this.removeAllGraphics = function(){
    viewController.removeAllGraphics();
    domController.removeAllGraphics();
  };

  this.updateGraphics = emitterController.notifyUpdateRequest;

  this.fadeDown = outputController.fadeDown;

  this.fadeUp = outputController.fadeUp;

  this.updateOnZoom = outputController.updateOnZoom;

  this.updateOnPan = outputController.updateOnPan;

}
