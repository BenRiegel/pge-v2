//imports ----------------------------------------------------------------------

import ModelController from './subcontrollers/ModelController.js';
import ViewDomController from './subcontrollers/ViewDomController.js';
import ViewOutputController from './subcontrollers/ViewOutputController.js';


//exports ----------------------------------------------------------------------

export default function SelectMenuOptionController(config, model, view){

  //define subcontrollers ------------------------------------------------------

  var modelController = new ModelController(model, config);
  var domController = new ViewDomController(view);
  var outputController = new ViewOutputController(view);

  //public api -----------------------------------------------------------------

  this.updateIsSelected = function(selectedOptionKey, isOpen){
    modelController.updateIsSelected(selectedOptionKey);
    if (model.props.isSelected.hasChanged){
      outputController.updateSelectedStyling(model.isSelected, isOpen);
    }
  };

  this.updateLabelIndent = outputController.updateLabelIndent;

  this.updateIconChar = outputController.updateIconChar;

  this.updateIconBorderVisibility = outputController.updateIconBorderVisibility;

  this.updateRootVisibility = function(isOpen){
    outputController.updateRootVisibility(model.isSelected, isOpen);
  };

  this.updateRootBorderRadius = function(isOpen){
    outputController.updateRootBorderRadius(model.isSelected, isOpen);
  };

  this.updateRootHeight = function(isOpen){
    return outputController.updateRootHeight(model.isSelected, isOpen);
  };

  this.updateRootOpacity = function(isOpen){
    return outputController.updateRootOpacity(model.isSelected, isOpen);
  };

}
