//imports ----------------------------------------------------------------------

import ComponentState from '../../../lib/ComponentState.js';


//exports ----------------------------------------------------------------------

export default function OptionState(menuState, key, props){

  //create state var -----------------------------------------------------------

  var state = new ComponentState(props);

  //define state change reactions ----------------------------------------------

  var updateIsSelected = function(){
    state.set('isSelected', menuState.selectedOptionKey === key);
  }

  //load reactions -------------------------------------------------------------

  menuState.addListener('selectedOptionKey', 'optionState', 'isSelected', updateIsSelected);

  //public api -----------------------------------------------------------------

  return state;

}
