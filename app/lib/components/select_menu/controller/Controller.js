//imports ----------------------------------------------------------------------

import EmitterController from './subcontrollers/EmitterController.js';
import ModelController from './subcontrollers/ModelController.js';
import ViewController from './subcontrollers/ViewController.js';
import ViewDomController from './subcontrollers/ViewDomController.js';
import ViewInputController from './subcontrollers/ViewInputController.js';
import ViewOutputController from './subcontrollers/ViewOutputController.js';


//exports ----------------------------------------------------------------------

export default function SelectMenuController(emitter, model, view){

  var { nodes } = view;
  var { root } = nodes;

  //define subcontrollers ------------------------------------------------------

  var emitterController = new EmitterController(emitter, model, view);
  var modelController = new ModelController(model);
  var viewController = new ViewController(view);
  var domController = new ViewDomController(view);
  var inputController = new ViewInputController(view);
  var outputController = new ViewOutputController(view, model);

  //load event listeners -------------------------------------------------------

  root.setEventListener('click', async function(selectedOptionKey){
    inputController.disable();
    emitterController.notifyOnActionStart();
    modelController.updateSelectedOptionKey(selectedOptionKey);
    outputController.updateOnOptionSelect();
    modelController.toggleIsOpen();
    await outputController.updateOnIsOpenChange();
    emitterController.notifyOnActionEnd();
    inputController.enable();
  });

  //public api -----------------------------------------------------------------

  this.enable = inputController.enable;

  this.disable = inputController.disable;

  this.loadOption = function(key, option){
    modelController.addOption(key);
    domController.addOption(option);
    viewController.addOption(option);
    outputController.renderOption(option);
  };

  this.setSelectedOption = function(newKey){
    modelController.updateSelectedOptionKey(newKey);
    outputController.updateOnOptionSelect();
  };

  this.forceClose = function(){
    viewStateController.setClosed();
    return outputController.updateViewStateChanges();
  };

}
