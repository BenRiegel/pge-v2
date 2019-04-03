export default function PopupReportViewDomController(view){

  var { nodes, subcomponents } = view;
  var { root, content, closeButton, contractButton, iframe } = nodes;
  var { loader } = subcomponents;

  //configure dom --------------------------------------------------------------

  root.appendChildNode(loader.rootNode);
  root.appendChildNode(content.node);
  content.appendChildNode(closeButton.node);
  content.appendChildNode(contractButton.node);
  content.appendChildNode(iframe.node);

}
