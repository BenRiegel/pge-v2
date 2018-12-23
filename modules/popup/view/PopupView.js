//imports ----------------------------------------------------------------------

import ContainerNode from './nodes/ContainerNode.js';
import SummaryWindow from '../../popup_summary/PopupSummary.js';
import ReportWindow from '../../popup_report/PopupReport.js';


//exports ----------------------------------------------------------------------

export default function PopupView(state){

  //create nodes ---------------------------------------------------------------

  var container = new ContainerNode();
  var summaryWindow = new SummaryWindow();
  var reportWindow = new ReportWindow();

  //configure dom --------------------------------------------------------------

  container.node.appendChild(summaryWindow.rootNode);
  container.node.appendChild(reportWindow.rootNode);

  //public api -----------------------------------------------------------------

  this.rootNode = container.node;

}
