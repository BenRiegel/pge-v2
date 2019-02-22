//imports ----------------------------------------------------------------------

import ContainerNode from './nodes/ContainerNode.js';
import ContentContainerNode from './nodes/ContentContainerNode.js';
import IframeNode from './nodes/IframeNode.js';
import Loader from './subcomponents/ReportLoader.js';
import CloseButton from './subcomponents/CloseButton.js';
import ContractButton from './subcomponents/ContractButton.js';


//exports ----------------------------------------------------------------------

export default function ReportWindowView(popupState, reportState){

  //create nodes ---------------------------------------------------------------

  var container = new ContainerNode(reportState);
  var contentContainer = new ContentContainerNode(popupState, reportState);
  var iframe = new IframeNode(popupState, reportState);

  //create subcomponents -------------------------------------------------------

  var closeButton = new CloseButton(popupState);
  var contractButton = new ContractButton(popupState);
  var loader = new Loader(popupState, reportState);

  //configure dom --------------------------------------------------------------

  container.node.appendChild(contentContainer.node);
  container.node.appendChild(loader.rootNode);
  contentContainer.node.appendChild(iframe.node);
  contentContainer.node.appendChild(closeButton.rootNode);
  contentContainer.node.appendChild(contractButton.rootNode);

  //public api -----------------------------------------------------------------

  this.rootNode = container.node;

}
