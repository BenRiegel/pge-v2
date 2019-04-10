export default function PopupTemplateViewDomController(view){

  var { nodes } = view;
  var { root, title, author, inlineContainer, image, text, readMore } = nodes;

  //configure dom --------------------------------------------------------------

  root.appendChildNode(title.node);
  root.appendChildNode(author.node);
  root.appendChildNode(inlineContainer.node);
  inlineContainer.appendChildNode(image.node);
  inlineContainer.appendChildNode(text.node);
  inlineContainer.appendChildNode(readMore.node);

}
