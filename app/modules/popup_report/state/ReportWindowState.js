//imports ----------------------------------------------------------------------

import ComponentState from '../../../lib/ComponentState.js';


//exports ----------------------------------------------------------------------

export default function ReportWindowState(popupState){

  //create state var -----------------------------------------------------------

  var state = new ComponentState({
    isVisible: popupState.isExpanded,
    projectUrl: null,
    contentIsLoaded: undefined,
  });

  state.onContentIsLoaded = function(){
    state.set('contentIsLoaded', true);
  }

  //modify behavior of isDisplaying prop ------------------------------------------

  state.props.isVisible.onChangeAsync = async function(){
    if (state.isVisible){
      this.requestUpdate('container - visibility');
      await this.requestUpdateAsync('fadeContainer - opacity');
    } else {
      await this.requestUpdateAsync('fadeContainer - opacity');
      this.requestUpdate('container - visibility');
    }
  };

  state.props.contentIsLoaded.onChangeAsync = async function(){
    this.requestUpdate('reportLoader - activation');
    await this.requestUpdateAsync('contentContainer - opacity');
  };

  //define state change reactions ----------------------------------------------

  var updateIsVisible = async function(){
    await state.setAsync('isVisible', popupState.isExpanded);
  };

  var loadContent = function(){
    state.set('projectUrl', popupState.projectData.url);
  };

  var updateContentIsLoaded = function(){
    state.set('contentIsLoaded', false);
  };

  //define state change reactions ----------------------------------------------

  state.addListener('projectUrl', 'self - contentIsLoaded', updateContentIsLoaded);
  popupState.addListener('isExpanded', 'reportWindow - isVisible', updateIsVisible);
  popupState.addListener('isExpanded', 'reportWindow - loadContent', loadContent);

  //public api -----------------------------------------------------------------

  return state;

}
