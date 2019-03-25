//imports ----------------------------------------------------------------------

import RootNode from './nodes/RootNode.js';
import PopupNode from './nodes/PopupNode.js';
import ArrowNode from './nodes/ArrowNode.js';
import ContentNode from './nodes/ContentNode.js';
import PopupReport from '../../popup_report/PopupReport.js';
import PopupSummary from '../../popup_summary/PopupSummary.js';


//exports ----------------------------------------------------------------------

export default function PopupView(model){

  //public api -----------------------------------------------------------------

  this.nodes = {
    root: new RootNode(),
    popup: new PopupNode(),
    arrow: new ArrowNode(),
    content: new ContentNode(),
  };

  this.subcomponents = {
    summary: new PopupSummary(model),
    report: new PopupReport(model),
  };

}
