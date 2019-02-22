//imports ----------------------------------------------------------------------

import ComponentState from '../../../lib/ComponentState2.js';


//exports ----------------------------------------------------------------------

export default function SelectMenuState(){

  //create state var -----------------------------------------------------------

  var state = new ComponentState({
    eventInProgress: false,
    isAnimating: false,
    isEnabled: true,
    isOpen: false,
    selectedOptionKey: null,
  });

  //modify behavior of isOpenProp ----------------------------------------------

  state.setOnChange('isOpen', async function(){
    if (state.isOpen === true){
      this.requestUpdate('menuContainer - borderRadius');
      this.requestUpdate('optionLabelContainer - indent');
      this.requestUpdate('optionIcon - iconChar');
      this.requestUpdate('optionIconContainer - borderVisibility');
      this.requestUpdate('optionContainer - borderRadius');
      this.requestUpdate('optionContainer - visibility');
      await this.requestUpdateAsync('optionContainer - height');
      await this.requestUpdateAsync('optionContainer - opacity');
    } else {
      await this.requestUpdateAsync('optionContainer - opacity');
      await this.requestUpdateAsync('optionContainer - height');
      this.requestUpdate('optionContainer - visibility');
      this.requestUpdate('optionContainer - borderRadius');
      this.requestUpdate('optionIconContainer - borderVisibility');
      this.requestUpdate('optionIcon - iconChar');
      this.requestUpdate('optionLabelContainer - indent');
      this.requestUpdate('menuContainer - borderRadius');
    }
  });

  //define methods -------------------------------------------------------------

  state.updateOnOptionClick = async function(optionClicked){
    state.set('eventInProgress', true);
    state.set('isAnimating', false);
    state.set('selectedOptionKey', optionClicked);
    state.set('isAnimating', true);
    await state.setAsync('isOpen', !state.isOpen);
    state.set('eventInProgress', false);
  };

  //public api -----------------------------------------------------------------

  return state;

}
