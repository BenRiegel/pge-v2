//imports ----------------------------------------------------------------------

import ModelController from './subcontrollers/ModelController.js';
import ViewDomController from './subcontrollers/ViewDomController.js';
import ViewOutputController from './subcontrollers/ViewOutputController.js';


//exports ----------------------------------------------------------------------

export default function GraphicController(props, model, view){

  var modelController = new ModelController(model, props);
  var domController = new ViewDomController(view);
  var outputController =  new ViewOutputController(view, props, model);

  //public api -----------------------------------------------------------------

  this.updateModel = function(selectedGraphicId){
    modelController.updateIsSelected(selectedGraphicId);
    outputController.updateSelectedStyling();
  };

  this.renderView = outputController.renderView;

  this.updateOnPan = outputController.updateOnPan;

  this.updateOnZoom = outputController.updateOnZoom;

}
