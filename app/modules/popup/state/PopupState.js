//imports ----------------------------------------------------------------------

import ComponentState from '../../../lib/ComponentState.js';


//exports ----------------------------------------------------------------------

export default function PopupState(){

  //create state var -----------------------------------------------------------

  var state = new ComponentState({
    eventInProgress: false,
    userDisabled: false,
    isListening: true,
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
    await this.setAsync('isExpanded', true);
    this.set('eventInProgress', false);
  }

  state.onContractAction = async function(){
    this.set('eventInProgress', true);
    await this.setAsync('isExpanded', false);
    this.set('eventInProgress', false);
  }

  //modify behavior of isExpanded prop -----------------------------------------

  state.props.isExpanded.onChangeAsync = async function(){
    if (state.isExpanded){
      await this.requestUpdateAsync('summaryWindow - isExpanded');
      this.requestUpdate('reportWindow - loadContent');
      await this.requestUpdateAsync('reportWindow - isVisible');
    } else {
      await this.requestUpdateAsync('reportWindow - isVisible');
      await this.requestUpdateAsync('summaryWindow - isExpanded');
    }
  };

  //define state change reactions ----------------------------------------------

  var updateIsListening = function(){
    var isListening = !state.userDisabled && !state.eventInProgress;
    state.set('isListening', isListening);
  }

  //load reactions -------------------------------------------------------------

  state.addListener('userDisabled', 'self - isListening', updateIsListening);
  state.addListener('eventInProgress', 'self - isListening', updateIsListening);

  //public api -----------------------------------------------------------------

  return state;

}
