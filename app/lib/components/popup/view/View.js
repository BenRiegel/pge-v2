//imports ----------------------------------------------------------------------

import RootNode from './nodes/RootNode.js';
import PopupReport from '../../popup_report/PopupReport.js';
import PopupSummary from '../../popup_summary/PopupSummary.js';


//exports ----------------------------------------------------------------------

export default function PopupView(model){

  //public api -----------------------------------------------------------------

  this.nodes = {
    root: new RootNode(),
  };

  this.subcomponents = {
    summary: new PopupSummary(model),
    report: new PopupReport(model),
  };

}
