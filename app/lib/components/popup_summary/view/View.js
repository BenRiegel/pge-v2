//imports ----------------------------------------------------------------------

import RootNode from './nodes/RootNode.js';
import ContentNode from './nodes/ContentNode.js';
import CloseButtonNode from './nodes/CloseButtonNode.js';
import TitleNode from './nodes/TitleNode.js';
import AuthorNode from './nodes/AuthorNode.js';
import InlineContainerNode from './nodes/InlineContainerNode.js';
import ImageNode from './nodes/ImageNode.js';
import TextNode from './nodes/TextNode.js';
import ReadMoreNode from './nodes/ReadMoreNode.js';
import Loader from '../../loader/Loader.js';


//exports ----------------------------------------------------------------------

export default function PopupSummaryView(){

  //public api -----------------------------------------------------------------

  this.nodes = {
    root: new RootNode(),
    content: new ContentNode(),
    closeButton: new CloseButtonNode(),
    title: new TitleNode(),
    author: new AuthorNode(),
    inlineContainer: new InlineContainerNode(),
    image: new ImageNode(),
    text: new TextNode(),
    readMore: new ReadMoreNode(),
  };

  this.subcomponents = {
    loader: new Loader(),
  };

}
