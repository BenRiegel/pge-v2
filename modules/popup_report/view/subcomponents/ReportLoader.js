//imports ----------------------------------------------------------------------

import Loader from '../../../loader/Loader.js';


//exports ----------------------------------------------------------------------

export default function ReportLoader(popupState, reportState){

  //create subcomponent --------------------------------------------------------

  var loader = new Loader();

  //define state change reactions ----------------------------------------------

  var activate = function(){
    loader.show();
  }

  var terminate = function(){
    loader.hide( {fadeOutOnHide:false} );
  }

  //load reactions -------------------------------------------------------------

  reportState.addListener('isVisible', 'reportLoader', 'activate', activate);
  reportState.addListener('isVisible', 'reportLoader', 'terminate', terminate);

  //public api -----------------------------------------------------------------

  this.rootNode = loader.rootNode;

}
