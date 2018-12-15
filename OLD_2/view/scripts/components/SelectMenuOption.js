//imports ----------------------------------------------------------------------

import State from '../lib/State.js';
import { addChildrenTo } from '../lib/ViewUtils.js';
import NewOptionIcon from './SelectMenuOptionIcon.js';
import NewOptionLabel from './SelectMenuOptionLabel.js';
import NewOptionContainer from './SelectMenuOptionContainer.js';


//exports ----------------------------------------------------------------------

export default function NewSelectMenuOption(name, count, type){

  // state ---------------------------------------------------------------------

  var state = new State('isSelected');

  // view ----------------------------------------------------------------------

  var icon = NewOptionIcon();
  var label = NewOptionLabel(name, count, type);
  var container = NewOptionContainer(name);
  addChildrenTo(container, [icon, label]);

  //controller -----------------------------------------------------------------

  state.isSelected.onChange = function(isSelected){
    icon.onIsSelectedChange(isSelected);
  };

  // public api ----------------------------------------------------------------

  return {
    rootNode: container.rootNode,
    onSelectedOptionChange: function(selectedOption){
      state.isSelected.set(selectedOption === name);
    },
    onIsOpenChange: async function(isOpen, isAnimating){
      if (isOpen){
        label.onIsOpenChange(isOpen);
        icon.onIsOpenChange(isOpen);
        await container.onIsOpenChange(isOpen, state.isSelected.value, isAnimating);
      } else {
        await container.onIsOpenChange(isOpen, state.isSelected.value, isAnimating);
        icon.onIsOpenChange(isOpen);
        label.onIsOpenChange(isOpen);
      }
    },
  }

}
