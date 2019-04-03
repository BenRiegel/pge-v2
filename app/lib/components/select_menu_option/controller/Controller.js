//imports ----------------------------------------------------------------------

import ModelController from './subcontrollers/ModelController.js';
import ViewDomController from './subcontrollers/ViewDomController.js';
import ViewOutputController from './subcontrollers/ViewOutputController.js';


//exports ----------------------------------------------------------------------

export default function SelectMenuOptionController(config, dispatcher, model, view, menuModel){

  //public api -----------------------------------------------------------------

  this.model = new ModelController(model, config, dispatcher, menuModel);
  this.viewDom = new ViewDomController(view);
  this.viewOutput = new ViewOutputController(view, config, model, menuModel, dispatcher);

}
