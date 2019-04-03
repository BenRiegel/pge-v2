export default function PopupSummaryViewDomController(view){

  var { nodes, subcomponents } = view;
  var { root, arrow, content, contentContainer, closeButton, title, author } = nodes;
  var { inlineContainer, image, text, readMore } = nodes;
  var { loader } = subcomponents;

  //configure dom --------------------------------------------------------------

  root.appendChildNode(contentContainer.node);
  root.appendChildNode(arrow.node);
  contentContainer.appendChildNode(loader.rootNode);
  contentContainer.appendChildNode(content.node);
  content.appendChildNode(closeButton.node);
  content.appendChildNode(title.node);
  content.appendChildNode(author.node);
  content.appendChildNode(inlineContainer.node);
  inlineContainer.appendChildNode(image.node);
  inlineContainer.appendChildNode(text.node);
  inlineContainer.appendChildNode(readMore.node);

}
