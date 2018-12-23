//imports ----------------------------------------------------------------------

import ComponentState from '../../../lib/ComponentState.js';


//exports ----------------------------------------------------------------------

export default function SelectMenuState(props){

  //create state var -----------------------------------------------------------

  var state = new ComponentState(props);

  //modify behavior of isOpenprop ----------------------------------------------

  state.setOnChange('isOpen', async function(currentValue, previousValue){
    if (currentValue === true){
      await this.requestUpdate('menuContainer', 'borderRadius', currentValue, previousValue);
      await this.requestUpdate('optionLabelContainer', 'indent', currentValue, previousValue);
      await this.requestUpdate('optionIcon', 'iconChar', currentValue, previousValue);
      await this.requestUpdate('optionIconContainer', 'borderVisibility', currentValue, previousValue);
      await this.requestUpdate('optionContainer', 'borderRadius', currentValue, previousValue);
      await this.requestUpdate('optionContainer', 'visibility', currentValue, previousValue);
      await this.requestUpdate('optionContainer', 'height', currentValue, previousValue);
      await this.requestUpdate('optionContainer', 'opacity', currentValue, previousValue);
    } else {
      await this.requestUpdate('optionContainer', 'opacity', currentValue, previousValue);
      await this.requestUpdate('optionContainer', 'height', currentValue, previousValue);
      await this.requestUpdate('optionContainer', 'visibility', currentValue, previousValue);
      await this.requestUpdate('optionContainer', 'borderRadius', currentValue, previousValue);
      await this.requestUpdate('optionIconContainer', 'borderVisibility', currentValue, previousValue);
      await this.requestUpdate('optionIcon', 'iconChar', currentValue, previousValue);
      await this.requestUpdate('optionLabelContainer', 'indent', currentValue, previousValue);
      await this.requestUpdate('menuContainer', 'borderRadius', currentValue, previousValue);
    }
  });

  //define methods -------------------------------------------------------------

  state.updateOnOptionClick = async function(optionClicked){
    state.set('isTransitioning', true);
    state.set('selectedOptionKey', optionClicked);
    await state.set('isOpen', !state.isOpen);
    state.set('isTransitioning', false);
  };

  //public api -----------------------------------------------------------------

  return state;

}
