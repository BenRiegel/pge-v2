//imports ----------------------------------------------------------------------

import Option from '../../select_menu_option/SelectMenuOption.js';
import EmitterController from './subcontrollers/EmitterController.js';
import ModelController from './subcontrollers/ModelController.js';
import ViewStateController from './subcontrollers/ViewStateController.js';
import ViewInputController from './subcontrollers/ViewInputController.js';
import ViewOutputController from './subcontrollers/ViewOutputController.js';
import ViewDomController from './subcontrollers/ViewDomController.js';


//exports ----------------------------------------------------------------------

export default function SelectMenuController(emitter, model, view){

  var { nodes } = view;
  var { root } = nodes;
  var { props } = model;
  var { selectedOptionKey } = props;

  //define subcontrollers ------------------------------------------------------

  var emitterController = new EmitterController(emitter);
  var modelController = new ModelController(model);
  var viewStateController = new ViewStateController(view);
  var domController = new ViewDomController(view);
  var inputController = new ViewInputController(view);
  var outputController = new ViewOutputController(view);

  //load event listeners -------------------------------------------------------

  root.setListener('click', async optionKey => {
    inputController.disable();
    emitterController.notifyActionStart();
    modelController.setSelectedOptionKey(optionKey);
    if (selectedOptionKey.hasChanged){
      outputController.updateSelectedStyling(model.selectedOptionKey, view.state.isOpen);
    }
    viewStateController.toggleOpenState();
    await outputController.updateOpenStyling(view.state.isOpen);
    if (selectedOptionKey.hasChanged){
      emitterController.notifyNewSelectedOption(model.selectedOptionKey, view.state.isOpen);
    }
    emitterController.notifyActionEnd();
    inputController.enable();
  });

  //public api -----------------------------------------------------------------

  this.enable = inputController.enable;

  this.disable = inputController.disable;

  this.loadOptions = function(optionsData){
    for (var optionData of optionsData){
      var option = new Option(optionData);
      modelController.addOptionKey(optionData.key);
      outputController.addOption(option);
      domController.addOptionNode(option.rootNode);
    }
  };

  this.setSelectedOption = function(optionKey){
    modelController.setSelectedOptionKey(optionKey);
    if (selectedOptionKey.hasChanged){
      outputController.updateSelectedStyling(model.selectedOptionKey, view.state.isOpen);
    }
  };

  this.forceClose = function(){
    modelController.setClosed();
    if (view.state.props.isOpen.hasChanged){
      outputController.onForceClose();
    }
  };

}
