//imports ----------------------------------------------------------------------

import ReportWindowState from './state/ReportWindowState.js';
import ReportWindowView from './view/ReportWindowView.js';


//exports ----------------------------------------------------------------------

export default function PopupReport(popupState){

  //private code block ---------------------------------------------------------

  var reportState = new ReportWindowState(popupState);
  var view = new ReportWindowView(popupState, reportState);

  //public api -----------------------------------------------------------------

  this.rootNode = view.rootNode;

}
