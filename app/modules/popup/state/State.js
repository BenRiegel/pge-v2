//imports ----------------------------------------------------------------------

import ObservedObj from '../../../lib/ObservedObj.js';


//exports ----------------------------------------------------------------------

export default function PopupState(){

  //create state var -----------------------------------------------------------

  var state = new ObservedObj({
    isOpen: false,
    isExpanded: false,
    content: null,
  });

  //modify behavior of props ---------------------------------------------------

  state.props.isOpen.onChange = async function(currentValue){
    this.updateType('rootVisibility');
    this.updateType('arrowVisibility');
    if (currentValue === true){
      await this.updateTypeAsync('summaryContent');
      await this.updateTypeAsync('summaryIsActive');
      this.updateType('rootHeight');
    } else {
      this.updateType('rootHeight');
      this.updateType('summaryIsActive');
    }
    this.updateType('emitter');
  }

  state.props.isExpanded.onChange = async function(currentValue){
    this.updateType('emitter', true);
    if (currentValue === true){
      await this.updateTypeAsync('summaryIsActive');
      this.updateType('arrowVisibility');
      this.updateType('rootZIndex');
      await this.updateTypeAsync('rootDimensions');
      await this.updateTypeAsync('reportContent');
      await this.updateTypeAsync('reportIsActive');
    } else {
      await this.updateTypeAsync('reportIsActive');
      await this.updateTypeAsync('rootDimensions');
      this.updateType('rootZIndex');
      this.updateType('arrowVisibility');
      await this.updateTypeAsync('summaryIsActive');
    }
    this.updateType('emitter', false);
  }

  //public api -----------------------------------------------------------------

  return state;

}
