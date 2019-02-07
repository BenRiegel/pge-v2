//imports ----------------------------------------------------------------------

import NewOption from '../select_menu_option/SelectMenuOption.js';
import SelectMenuState from './state/SelectMenuState.js';
import SelectMenuEmitter from './services/SelectMenuEmitter.js';
import SelectMenuView from './view/SelectMenuView.js';


//exports ----------------------------------------------------------------------

export default function SelectMenu(){

  //private code block ---------------------------------------------------------

  var state = new SelectMenuState();
  var eventsEmitter = new SelectMenuEmitter(state);
  var view = new SelectMenuView(state);

  //public api -----------------------------------------------------------------

  this.rootNode = view.rootNode;

  this.addListener = eventsEmitter.addListener;

  this.addNewOption = function(optionProps){
    var option = NewOption(optionProps, state);
    view.addOptionNode(option.rootNode);
  };

  this.enable = function(){
    state.set('isEnabled', true);
  };

  this.disable = function(){
    state.set('isEnabled', false);
  };

  this.close = async function(){
    state.set('isAnimating', true);
    await state.set('isOpen', false);
  };

  this.setSelectedOption = function(newOptionKey){
    state.set('isAnimating', false);
    state.set('selectedOptionKey', newOptionKey);
  };
}
