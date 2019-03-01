//imports ----------------------------------------------------------------------

import Loader from '../../../loader/Loader.js';


//exports ----------------------------------------------------------------------

export default function ReportLoader(popupState, reportState){

  //create subcomponent --------------------------------------------------------

  var loader = new Loader();

  //define state change reactions ----------------------------------------------

  var updateActivation = function(){
    if (reportState.contentIsLoaded){
      loader.hide(false);
    } else {
      loader.show();
    }
  }

  //load reactions -------------------------------------------------------------

  reportState.addListener('contentIsLoaded', 'reportLoader - activation', updateActivation);

  //public api -----------------------------------------------------------------

  this.rootNode = loader.rootNode;

}
