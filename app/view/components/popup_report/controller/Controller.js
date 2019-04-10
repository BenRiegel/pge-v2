//imports ----------------------------------------------------------------------

import EmitterController from './subcontrollers/EmitterController.js';
import ModelController from './subcontrollers/ModelController.js';
import ViewDomController from './subcontrollers/ViewDomController.js';
import ViewInputController from './subcontrollers/ViewInputController.js';
import ViewOutputController from './subcontrollers/ViewOutputController.js';


//exports ----------------------------------------------------------------------

export default function PopupReportController(emitter, model, view){

  //declare subcontrollers -----------------------------------------------------

  var modelController = new ModelController(model);
  var emitterController = new EmitterController(emitter);
  var domController = new ViewDomController(view);
  var inputController = new ViewInputController(view);
  var outputController = new ViewOutputController(view, model);

  //load event listeners -------------------------------------------------------

  view.nodes.closeButton.setEventListener('click', () => {
    outputController.contractAndClose();
    emitterController.broadcastClose();
  });

  view.nodes.contractButton.setEventListener('click', () => {
    emitterController.broadcastContract();
  });

  //public api -----------------------------------------------------------------

  this.setPosition = outputController.setPosition;

  this.open = outputController.open;

  this.close = outputController.close;

  this.expand = outputController.expand;

  this.contract = outputController.contract;

  this.load = function(content){
    modelController.updateContent(content);
    return outputController.loadContent();
  };

}
