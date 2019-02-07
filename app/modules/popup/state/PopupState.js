//imports ----------------------------------------------------------------------

import ComponentState from '../../../lib/ComponentState.js';


//exports ----------------------------------------------------------------------

export default function PopupState(){

  //create state var -----------------------------------------------------------

  var state = new ComponentState({
    eventInProgress: false,
    isEnabled: true,
    isOpen: false,
    isExpanded: false,
    projectData: null,
  });

  state.onCloseAction = function(){
    this.set('isOpen', false);
    this.set('isExpanded', false);
  }

  state.onExpandAction = async function(){
    this.set('eventInProgress', true);
    await this.set('isExpanded', true);
    this.set('eventInProgress', false);
  }

  state.onContractAction = async function(){
    this.set('eventInProgress', true);
    await this.set('isExpanded', false);
    this.set('eventInProgress', false);
  }

  //modify behavior of isExpanded prop -----------------------------------------

  state.setOnChange('isExpanded', async function(currentValue){
    if (currentValue === true){
      await this.requestUpdate('summaryWindow', 'isExpanded');
      await this.requestUpdate('reportWindow', 'isVisible');
    } else {
      await this.requestUpdate('reportWindow', 'isVisible');
      await this.requestUpdate('summaryWindow', 'isExpanded');
    }
  });

  //public api -----------------------------------------------------------------

  return state;

}
