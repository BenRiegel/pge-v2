//imports ----------------------------------------------------------------------

import ContainerNode from './nodes/ContainerNode.js';
import ArrowNode from './nodes/ArrowNode.js';
import BodyNode from './nodes/BodyNode.js';
import ContentContainerNode from './nodes/ContentContainerNode.js';
import AuthorNode from './nodes/AuthorNode.js';
import TitleNode from './nodes/TitleNode.js';
import ImageNode from './nodes/ImageNode.js';
import TextNode from './nodes/TextNode.js';
import ReadMoreTextNode from './nodes/ReadMoreTextNode.js';
import CloseButton from './subcomponents/CloseButton.js';
import Loader from './subcomponents/SummaryLoader.js';


//exports ----------------------------------------------------------------------

export default function PopupSummaryView(popupState, summaryState){

  //create nodes ---------------------------------------------------------------

  var container = new ContainerNode(popupState, summaryState);
  var arrow = new ArrowNode(summaryState);
  var body = new BodyNode();
  var contentContainer = new ContentContainerNode(summaryState);
  var author = new AuthorNode(popupState);
  var title = new TitleNode(popupState);
  var image = new ImageNode(popupState, summaryState);
  var text = new TextNode(popupState);
  var readMoreText = new ReadMoreTextNode(popupState);

  //create subcomponents -------------------------------------------------------

  var loader = new Loader(popupState, summaryState);
  var closeButton = new CloseButton(popupState);

  //configure dom --------------------------------------------------------------

  container.appendChildNode(body.node);
  container.appendChildNode(arrow.node);
  body.appendChildNode(loader.rootNode);
  body.appendChildNode(contentContainer.node);
  contentContainer.appendChildNode(closeButton.rootNode);
  contentContainer.appendChildNode(title.node);
  contentContainer.appendChildNode(author.node);
  contentContainer.appendChildNode(image.node);
  contentContainer.appendChildNode(text.node);
  contentContainer.appendChildNode(readMoreText.node);

  //public api -----------------------------------------------------------------

  this.rootNode = container.node;

}
