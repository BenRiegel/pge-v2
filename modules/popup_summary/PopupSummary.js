//imports ----------------------------------------------------------------------

import SummaryWindowState from './state/SummaryWindowState.js';
import SummaryWindowView from './view/SummaryWindowView.js';


//exports ----------------------------------------------------------------------

export default function PopupSummary(popupState){

  //private code block ---------------------------------------------------------

  var summaryState = new SummaryWindowState(popupState);
  var view = new SummaryWindowView(popupState, summaryState);

  //public api -----------------------------------------------------------------

  this.rootNode = view.rootNode;

}
