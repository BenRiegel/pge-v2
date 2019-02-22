//imports ----------------------------------------------------------------------

import ComponentState from '../../../lib/ComponentState2.js';


//exports ----------------------------------------------------------------------

export default function OptionState(menuState, key){

  //create state var -----------------------------------------------------------

  var state = new ComponentState({
    isAnimating: false,
    isSelected: undefined,
  });

  //define state change reactions ----------------------------------------------

  var updateIsAnimating = function(){
    state.set('isAnimating', menuState.isAnimating && !state.isSelected);
  }

  var updateIsSelected = function(){
    state.set('isSelected', key === menuState.selectedOptionKey);
  }

  //load reactions -------------------------------------------------------------

  menuState.addListener('isAnimating', 'optionState - isAnimating', updateIsAnimating);
  menuState.addListener('selectedOptionKey', 'optionState - isSelected', updateIsSelected);

  //init state -----------------------------------------------------------------

  updateIsSelected();

  //public api -----------------------------------------------------------------

  return state;

}
