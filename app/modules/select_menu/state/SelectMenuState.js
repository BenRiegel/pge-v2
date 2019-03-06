//imports ----------------------------------------------------------------------

import ComponentState from '../../../lib/ComponentState.js';


//exports ----------------------------------------------------------------------

export default function SelectMenuState(){

  var state = new ComponentState({
    isOpen: false,
    selectedOptionKey: null,
  });

  //modify behavior of isOpen prop ---------------------------------------------

  state.props.isOpen.onChange = async function(currentValue){
    this.updateType('eventInProgress', true);
    if (currentValue === true){
      this.updateType('menuContainerBorderRadius');
      this.updateType('optionLabelIndent');
      this.updateType('optionIconChar');
      this.updateType('optionIconBorderVisibility');
      this.updateType('optionContainerBorderRadius');
      this.updateType('optionContainerVisibility');
      await this.updateTypeAsync('optionContainerHeight');
      await this.updateTypeAsync('optionContainerOpacity');
    } else {
      await this.updateTypeAsync('optionContainerOpacity');
      await this.updateTypeAsync('optionContainerHeight');
      this.updateType('optionContainerVisibility');
      this.updateType('optionContainerBorderRadius');
      this.updateType('optionIconBorderVisibility');
      this.updateType('optionIconChar');
      this.updateType('optionLabelIndent');
      this.updateType('menuContainerBorderRadius');
    }
    this.updateType('eventInProgress', false);
  }

  //public api -----------------------------------------------------------------

  return state;

}
