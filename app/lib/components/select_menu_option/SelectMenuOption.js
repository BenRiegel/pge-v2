//imports ----------------------------------------------------------------------

import State from './state/State.js';
import View from './view/View.js';
import StateController from './controllers/StateController.js';
import ViewController from './controllers/ViewController.js';


//exports ----------------------------------------------------------------------

export default function SelectMenuOption(optionProps, menuState){

  //private code block ---------------------------------------------------------

  var optionState = new State();
  var view = new View(optionProps);
  var controller = {
    state: new StateController(optionState, optionProps.key, menuState),
    view: new ViewController(view, optionProps.labelIsIndented, menuState, optionState),
  }

  //public api -----------------------------------------------------------------

  this.rootNode = view.nodes.root.node;

  this.select = function(){
    optionState.set('isSelected', true);
  }

  this.unselect = function(){
    optionState.set('isSelected', false);
  }

}
