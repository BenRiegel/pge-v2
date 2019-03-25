//imports ----------------------------------------------------------------------

import ViewController from './subcontrollers/ViewController.js';
import ModelController from './subcontrollers/ModelController.js';


//exports ----------------------------------------------------------------------

export default function SelectMenuOptionController(config, dispatcher, model, view, menuModel){

  //public api -----------------------------------------------------------------

  this.model = new ModelController(model, config, dispatcher, menuModel);
  this.view = new ViewController(view, config, model, menuModel, dispatcher);

}
