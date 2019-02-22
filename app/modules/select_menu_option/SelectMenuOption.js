//imports ----------------------------------------------------------------------

import OptionState from './state/OptionState.js';
import OptionView from './view/OptionView.js';


//exports ----------------------------------------------------------------------

export default function SelectMenuOption(labelProps, menuState){

  //private code block ---------------------------------------------------------

  var optionState = new OptionState(menuState, labelProps.key);
  var view = new OptionView(menuState, optionState, labelProps);

  //public api -----------------------------------------------------------------

  this.rootNode = view.rootNode;

}
