//imports ----------------------------------------------------------------------

import Loader from '../../../loader/Loader.js';


//exports ----------------------------------------------------------------------

export default function SummaryLoader(popupState, summaryState){

  //create subcomponent --------------------------------------------------------

  var loader = new Loader();

  //define state change reactions ----------------------------------------------

  var activate = function(){
    loader.show();
  }

  var terminate = function(){
    loader.hide(false);
  }

  //load reactions -------------------------------------------------------------

  summaryState.addListener('isVisible', 'loader', 'activate', activate);
  summaryState.addListener('isVisible', 'loader', 'terminate', terminate);

  //public api -----------------------------------------------------------------

  this.rootNode = loader.rootNode;

}
