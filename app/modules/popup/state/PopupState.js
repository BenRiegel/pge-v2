//imports ----------------------------------------------------------------------

import ComponentState from '../../../lib/ComponentState.js';


//exports ----------------------------------------------------------------------

export default function PopupState(){

  //create state var -----------------------------------------------------------

  var state = new ComponentState({
    isOpen: false,
    isExpanded: false,
    content: null,
  });

  //modify behavior of props ---------------------------------------------------

  state.props.isOpen.onChange = async function(currentValue){
    this.updateType('containerVisibility');
    if (currentValue === true){
      await this.updateTypeAsync('summaryContent');
      await this.updateTypeAsync('containerHeightAjust')
      await this.updateTypeAsync('summaryOpacity');
    } else {
      this.updateType('containerDimensions');
      this.updateType('summaryOpacity');
    }
    this.updateType('publicEmitter');
  }

  state.props.isExpanded.onChange = async function(currentValue){
    this.updateType('eventInProgress', true);
    if (currentValue === true){
      await this.updateTypeAsync('summaryOpacity');
      this.updateTypeAsync('arrowDisplay');
      this.updateType('containerZIndex');
      await this.updateTypeAsync('containerDimensions');
      await this.updateTypeAsync('reportContent');
      await this.updateTypeAsync('reportOpacity');
    } else {
      await this.updateTypeAsync('reportOpacity');
      await this.updateTypeAsync('containerDimensions');
      this.updateType('containerZIndex');
      this.updateTypeAsync('arrowDisplay');
      await this.updateTypeAsync('summaryOpacity');
    }
    this.updateType('eventInProgress', false);
  }

  //public api -----------------------------------------------------------------

  return state;

}
