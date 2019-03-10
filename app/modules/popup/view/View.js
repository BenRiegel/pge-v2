//imports ----------------------------------------------------------------------

import RootNode from './nodes/RootNode.js';
import ArrowNode from './nodes/ArrowNode.js';
import ArrowCoverNode from './nodes/ArrowCoverNode.js';
import PopupReport from '../../popup_report/PopupReport.js';
import PopupSummary from '../../popup_summary/PopupSummary.js';


//exports ----------------------------------------------------------------------

export default function PopupView(state){

  //public api -----------------------------------------------------------------

  this.nodes = {
    root: new RootNode(),
    arrow: new ArrowNode(),
    arrowCover: new ArrowCoverNode(),
  };

  this.subcomponents = {
    summary: new PopupSummary(state),
    report: new PopupReport(state),
  };

}
