//imports ----------------------------------------------------------------------

import ObservedObj from '../../../lib/ObservedObj.js';


//exports ----------------------------------------------------------------------

export default function PopupReportState(){

  //create state var -----------------------------------------------------------

  var state = new ObservedObj({
    isActive: undefined,
    content: undefined,
  });

  //modify behavior of props ---------------------------------------------------

  state.props.content.onChange = async function(){
    this.updateType('loaderIsActive', true);
    await this.updateTypeAsync('iframeContent');
    this.updateTypeAsync('loaderIsActive', false);
  }

  state.props.isActive.onChange = async function(){
    if (state.isActive){
      this.updateType('rootVisibility');
      await this.updateTypeAsync('contentOpacity');
    } else {
      await this.updateTypeAsync('contentOpacity');
      this.updateType('rootVisibility');
    }
  }

  //public api -----------------------------------------------------------------

  return state;

}
