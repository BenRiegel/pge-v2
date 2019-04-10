//imports ----------------------------------------------------------------------

import EmitterController from './subcontrollers/EmitterController.js';
import ViewDomController from './subcontrollers/ViewDomController.js';
import ViewInputController from './subcontrollers/ViewInputController.js';
import ViewOutputController from './subcontrollers/ViewOutputController.js';
import ModelController from './subcontrollers/ModelController.js';


//exports ----------------------------------------------------------------------

export default function PopupController(emitter, model, view){

  var emitterController = new EmitterController(emitter, view);
  var modelController = new ModelController(model);
  var domController = new ViewDomController(view);
  var inputController = new ViewInputController(view);
  var outputController = new ViewOutputController(view, model);

  //load event listeners -------------------------------------------------------

  view.nodes.closeButton.setEventListener('click', () => {
    outputController.close();
    emitterController.notifyOnClose();
  });

  //public api -----------------------------------------------------------------

  this.enable = inputController.enable;

  this.disable = inputController.disable;

  this.open = function(content){
    modelController.updateContent(content);
    return outputController.open();
  };

  this.close = function(){
    outputController.close();
    emitterController.notifyOnClose();
  };

  this.getDimensions = outputController.getDimensions;

  this.hideArrow = outputController.hideArrow;

  this.showArrow = outputController.showArrow;

}
