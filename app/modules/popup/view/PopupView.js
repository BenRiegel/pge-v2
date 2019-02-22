//imports ----------------------------------------------------------------------

import ContainerNode from './nodes/ContainerNode.js';
import SummaryWindow from '../../popup_summary/SummaryWindow.js';
import ReportWindow from '../../popup_report/ReportWindow.js';


//exports ----------------------------------------------------------------------

export default function PopupView(state){

  //create nodes ---------------------------------------------------------------

  var container = new ContainerNode();

  //create subcomponents -------------------------------------------------------

  var summaryWindow = new SummaryWindow(state);
  var reportWindow = new ReportWindow(state);

  //configure dom --------------------------------------------------------------

  container.appendChildNode(summaryWindow.rootNode);
  container.appendChildNode(reportWindow.rootNode);

  //public api -----------------------------------------------------------------

  this.rootNode = container.node;

}
