//imports ----------------------------------------------------------------------

import ModelController from './subcontrollers/ModelController.js';
import ViewDomController from './subcontrollers/ViewDomController.js';
import ViewOutputController from './subcontrollers/ViewOutputController.js';


//exports ----------------------------------------------------------------------

export default function SelectMenuOptionController(props, model, view){

  //define subcontrollers ------------------------------------------------------

  var modelController = new ModelController(model, props);
  var domController = new ViewDomController(view, props);
  var outputController = new ViewOutputController(view, model);

  //public api -----------------------------------------------------------------

  this.updateModel = function(selectedOptionKey, isOpen){
    modelController.updateIsSelected(selectedOptionKey);
    outputController.updateSelectedStyling(isOpen);
  };

  this.renderView = outputController.renderView;

  this.updateIconVisibility = outputController.updateIconVisibility;

  this.updateIconChar = outputController.updateIconChar;

  this.updateIconBorderVisibility = outputController.updateIconBorderVisibility;

  this.updateRootVisibility = outputController.updateRootVisibility;

  this.updateRootBorderRadius = outputController.updateRootBorderRadius;

  this.updateRootHeight = outputController.updateRootHeight;

  this.updateRootOpacity = outputController.updateRootOpacity;

}
