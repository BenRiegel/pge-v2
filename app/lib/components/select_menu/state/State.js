//imports ----------------------------------------------------------------------

import ObservedObj from '../../../utils/ObservedObj.js';


//exports ----------------------------------------------------------------------

export default function SelectMenuState(){

  var state = new ObservedObj({
    isOpen: false,
    selectedOptionKey: null,
  });

  //modify behavior of isOpen prop ---------------------------------------------

  state.props.isOpen.onChange = async function(currentValue){
    this.updateType('viewIsUpdating', true);
    if (currentValue === true){
      this.updateType('menuRootBorderRadius');
      this.updateType('optionLabelIndent');
      this.updateType('optionIconChar');
      this.updateType('optionIconBorderVisibility');
      this.updateType('optionRootBorderRadius');
      this.updateType('optionRootVisibility');
      await this.updateTypeAsync('optionRootHeight');
      await this.updateTypeAsync('optionRootOpacity');
    } else {
      await this.updateTypeAsync('optionRootOpacity');
      await this.updateTypeAsync('optionRootHeight');
      this.updateType('optionRootVisibility');
      this.updateType('optionRootBorderRadius');
      this.updateType('optionIconBorderVisibility');
      this.updateType('optionIconChar');
      this.updateType('optionLabelIndent');
      this.updateType('menuRootBorderRadius');
    }
    this.updateType('viewIsUpdating', false);
  }

  //public api -----------------------------------------------------------------

  return state;

}
