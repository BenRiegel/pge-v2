//imports ----------------------------------------------------------------------

import NewOption from '../select_menu_option/SelectMenuOption.js';
import SelectMenuState from './state/SelectMenuState.js';
import SelectMenuEmitter from './services/SelectMenuEmitter.js';
import SelectMenuView from './view/SelectMenuView.js';


//exports ----------------------------------------------------------------------

export default function SelectMenu(){

  //private code block ---------------------------------------------------------

  var state = new SelectMenuState({
    isEnabled: true,
    isOpen: false,
    isTransitioning: false,
    selectedOptionKey: null,
  });

  var eventsEmitter = new SelectMenuEmitter(state);

  var view = new SelectMenuView(state);

  view.render()

  //public api -----------------------------------------------------------------

  this.rootNode = view.rootNode;

  this.addListener = eventsEmitter.addListener;

  this.addNewOption = function(optionProps){
    var option = NewOption(optionProps, state);
    view.addOption(option.rootNode);
  };

  this.enable = function(){
    state.set('isEnabled', true);
  };

  this.disable = function(){
    state.set('isEnabled', false);
  };

  this.close = async function(){
    await state.set('isOpen', false);
  };

  this.setSelectedOption = async function(newOptionKey){
    state.set('selectedOptionKey', newOptionKey);
  };
}
