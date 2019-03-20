//imports ----------------------------------------------------------------------

import ModelController from './subcontrollers/ModelController.js';
import ViewController from './subcontrollers/ViewController.js';


//exports ----------------------------------------------------------------------

export default function SelectMenuOptionController(config, optionModel, menuModel, view){

  //public api -----------------------------------------------------------------

  this.model = new ModelController(optionModel, config.key, menuModel)
  this.view = new ViewController(view, config.labelIsIndented, menuModel, optionModel);

}
