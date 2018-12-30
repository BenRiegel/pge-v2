//imports ----------------------------------------------------------------------

import OptionState from './state/OptionState.js';
import OptionView from './view/OptionView.js';


//exports ----------------------------------------------------------------------

export default function NewSelectMenuOption(labelProps, menuState){

  //private code block ---------------------------------------------------------

  var optionState = new OptionState(menuState, labelProps.key);
  var view = new OptionView(menuState, optionState, labelProps);
  
  //public api -----------------------------------------------------------------

  return {
    rootNode: view.rootNode,
  };
}
