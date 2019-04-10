export default function PopupReportViewDomController(view){

  var { nodes, subcomponents } = view;
  var { root, reportWindow, content } = nodes;
  var { closeButton, contractButton, iframe } = nodes;
  var { loader } = subcomponents;

  //configure dom --------------------------------------------------------------

  root.appendChildNode(reportWindow.node);
  reportWindow.appendChildNode(loader.rootNode);
  reportWindow.appendChildNode(content.node);
  content.appendChildNode(closeButton.node);
  content.appendChildNode(contractButton.node);
  content.appendChildNode(iframe.node);

}
