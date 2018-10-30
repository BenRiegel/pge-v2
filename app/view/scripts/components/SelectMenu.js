//imports ----------------------------------------------------------------------

import tagsList from '../../../data/Tags.js';
import State from '../../../state/State.js';
import { addChildrenTo, doForAll } from '../lib/ViewUtils.js';
import NewOption from './SelectMenuOption.js';
import NewSelectMenuContainer from './SelectMenuContainer.js';


//exports ----------------------------------------------------------------------

export default function NewSelectMenu(clickAction){

  //state ----------------------------------------------------------------------

  var state = new State('isOpen', 'selectedOption');

  //view -----------------------------------------------------------------------

  var options = [];
  for (var tag of tagsList){
    var option = NewOption(tag.name, tag.count, tag.type);
    options.push(option);
  }
  var container = NewSelectMenuContainer(clickAction);
  addChildrenTo(container, options);

  //controller -----------------------------------------------------------------

  state.isOpen.onChange = async function(currentValue, previousValue){
    var isAnimating = (previousValue !== undefined);
    if (currentValue === true){
      container.onIsOpenChange(currentValue);
      await doForAll(options, 'onIsOpenChange', currentValue, isAnimating);
    } else {
      await doForAll(options, 'onIsOpenChange', currentValue, isAnimating);
      container.onIsOpenChange(currentValue);
    }
  };

  state.selectedOption.onChange = function(selectedOption){
    doForAll(options, 'onSelectedOptionChange', selectedOption);
  };

  //public api -----------------------------------------------------------------

  return {
    rootNode: container.rootNode,
    enable: container.enableListener,
    disable: container.disableListener,
    close: async function(){
      await state.isOpen.set(false);
    },
    toggleOpenStatus: async function(){
      await state.isOpen.set(!state.isOpen.value);
    },
    setSelectedOption: async function(newValue){
      await state.selectedOption.set(newValue);
    }
  };
}
