//imports ----------------------------------------------------------------------

import ComponentState from '../../lib/ComponentState4.js';
import OptionView from './view/OptionView.js';
import StateController from './controller/StateController.js';
import ViewController from './controller/ViewController.js';


//exports ----------------------------------------------------------------------

export default function SelectMenuOption(optionProps, menuState){

  //private code block ---------------------------------------------------------

  var optionState = new ComponentState({
    isSelected: undefined,
  });
  var view = new OptionView(optionProps);
  var controller = {
    state: new StateController(optionProps.key, menuState, optionState),
    view: new ViewController(optionProps.labelIsIndented, menuState, optionState, view),
  }

  //public api -----------------------------------------------------------------

  this.rootNode = view.rootNode;

}
