//imports ----------------------------------------------------------------------

import ComponentState from '../../../lib/ComponentState.js';


//exports ----------------------------------------------------------------------

export default function ReportWindowState(popupState){

  //create state var -----------------------------------------------------------

  var state = new ComponentState({
    isVisible: popupState.isExpanded,
    contentIsLoaded: false,
  });

  state.onContentIsLoaded = function(){
    state.set('contentIsLoaded', true);
  }

  //modify behavior of isVisible prop ------------------------------------------

  state.setOnChange('isVisible', async function(currentValue){
    if (currentValue === true){
      this.requestUpdate('container', 'visibility');
      if (!state.contentIsLoaded){
        this.requestUpdate('reportLoader', 'activate');
        await this.requestUpdate('iframe', 'content');
        this.requestUpdate('reportLoader', 'terminate');
      }
      await this.requestUpdate('contentContainer', 'opacity');
    } else {
      await this.requestUpdate('contentContainer', 'opacity');
      this.requestUpdate('container', 'visibility');
    }
  });

  //define state change reactions ----------------------------------------------

  var updateIsVisible = async function(){
    await state.set('isVisible', popupState.isExpanded);
  };

  var updateContentIsLoaded = function(){
    state.set('contentIsLoaded', false);
  }

  //define state change reactions ----------------------------------------------

  popupState.addListener('isExpanded', 'reportWindow', 'isVisible', updateIsVisible);
  popupState.addListener('projectData', 'reportWindow', 'contentIsLoaded', updateContentIsLoaded);

  //public api -----------------------------------------------------------------

  return state;

}
