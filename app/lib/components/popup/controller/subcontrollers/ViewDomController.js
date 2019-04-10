export default function PopupViewDomController(view){

  var { nodes, subcomponents } = view;
  var { root, arrow, content, closeButton, templateContainer } = nodes;
  var { template, loader } = subcomponents;

  //configure dom --------------------------------------------------------------

  root.appendChildNode(content.node);
  root.appendChildNode(arrow.node);
  content.appendChildNode(loader.rootNode);
  content.appendChildNode(templateContainer.node);
  templateContainer.appendChildNode(closeButton.node);
  templateContainer.appendChildNode(template.rootNode);

}
