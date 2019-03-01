//imports ----------------------------------------------------------------------

import ComponentState from '../../../lib/ComponentState.js';
import { waitAtLeast, wait } from '../../../lib/Utils.js';


//exports ----------------------------------------------------------------------

export default function PopupSummaryState(popupState){

  //create state var -----------------------------------------------------------

  var state = new ComponentState({
    isVisible: popupState.isOpen,
    isExpanded: popupState.isExpanded,
  });

  //modify behavior of props ---------------------------------------------------

  state.props.isExpanded.onChangeAsync = async function(){
    if (state.isExpanded){
      console.log('hello');
      await this.requestUpdateAsync('fadeContainer - opacity');
      console.log('world')
      this.requestUpdate('arrow - display');
      this.requestUpdate('container - zIndex');
      await this.requestUpdateAsync('container - dimensions');
    } else {
      await this.requestUpdateAsync('container - dimensions');
      this.requestUpdate('container - zIndex');
      this.requestUpdate('arrow - display');
      await this.requestUpdateAsync('fadeContainer - opacity');
    }
  };

  state.props.isVisible.onChangeAsync = async function(){
    this.requestUpdate('arrow - display');
    this.requestUpdate('container - visibility');
    if (state.isVisible){
    //  if (!popupState.propHasUpdated('projectData')){

        this.requestUpdate('loader - activate');
        //await waitAtLeast(500, popupState.getPropUpdatePromise('projectData'));
        await wait(500);
        this.requestUpdate('loader - terminate');
      //}
      await this.requestUpdateAsync('contentContainer - height');
      await this.requestUpdateAsync('contentContainer - opacity');
    } else {
      this.requestUpdate('contentContainer - height');
      this.requestUpdate('contentContainer - opacity');
    }
  };

  //define state change reactions ----------------------------------------------

  var updateIsVisible = async function(){
    await state.setAsync('isVisible', popupState.isOpen);
  };

  var updateIsExpanded = async function(){
    await state.setAsync('isExpanded', popupState.isExpanded);
  }

  //load reactions -------------------------------------------------------------

  popupState.addListener('isOpen', 'summaryWindow - isVisible', updateIsVisible);
  popupState.addListener('isExpanded', 'summaryWindow - isExpanded', updateIsExpanded)

  //public api -----------------------------------------------------------------

  return state;

}
