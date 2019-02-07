//imports ----------------------------------------------------------------------

import ComponentState from '../../../lib/ComponentState.js';
import { waitAtLeast } from '../../../lib/Utils.js';


//exports ----------------------------------------------------------------------

export default function PopupSummaryState(popupState){

  //create state var -----------------------------------------------------------

  var state = new ComponentState({
    isVisible: popupState.isOpen,
    isExpanded: popupState.isExpanded,
  });

  //modify behavior of props ---------------------------------------------------

  state.setOnChange('isExpanded', async function(currentValue){
    if (currentValue === true){
      await this.requestUpdate('contentContainer', 'opacity');
      this.requestUpdate('arrow', 'display');
      this.requestUpdate('container', 'zIndex');
      await this.requestUpdate('container', 'dimensions');
    } else {
      await this.requestUpdate('container', 'dimensions');
      this.requestUpdate('container', 'zIndex');
      this.requestUpdate('arrow', 'display');
      await this.requestUpdate('contentContainer', 'opacity');
    }
  });

  state.setOnChange('isVisible', async function(currentValue){
    this.requestUpdate('arrow', 'display');
    this.requestUpdate('container', 'visibility');
    if (currentValue === true){
      if (!popupState.propHasUpdated('projectData')){
        this.requestUpdate('loader', 'activate');
        await waitAtLeast(500, popupState.getPropUpdatePromise('projectData'));
        this.requestUpdate('loader', 'terminate');
      }
      await this.requestUpdate('contentContainer', 'height');
      await this.requestUpdate('contentContainer', 'opacity');
    } else {
      this.requestUpdate('contentContainer', 'height');
      this.requestUpdate('contentContainer', 'opacity');
    }
  });

  //define state change reactions ----------------------------------------------

  var updateIsVisible = async function(){
    await state.set('isVisible', popupState.isOpen);
  };

  var updateIsExpanded = async function(){
    await state.set('isExpanded', popupState.isExpanded);
  }

  //load reactions -------------------------------------------------------------

  popupState.addListener('isOpen', 'summaryWindow', 'isVisible', updateIsVisible);
  popupState.addListener('isExpanded', 'summaryWindow', 'isExpanded', updateIsExpanded)

  //public api -----------------------------------------------------------------

  return state;

}
