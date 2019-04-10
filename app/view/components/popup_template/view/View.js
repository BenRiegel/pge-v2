//imports ----------------------------------------------------------------------

import RootNode from './nodes/RootNode.js';
import TitleNode from './nodes/TitleNode.js';
import AuthorNode from './nodes/AuthorNode.js';
import InlineContainerNode from './nodes/InlineContainerNode.js';
import ImageNode from './nodes/ImageNode.js';
import TextNode from './nodes/TextNode.js';
import ReadMoreNode from './nodes/ReadMoreNode.js';


//exports ----------------------------------------------------------------------

export default function PopupTemplateView(){

  //public api -----------------------------------------------------------------

  this.nodes = {
    root: new RootNode(),
    title: new TitleNode(),
    author: new AuthorNode(),
    inlineContainer: new InlineContainerNode(),
    image: new ImageNode(),
    text: new TextNode(),
    readMore: new ReadMoreNode(),
  };

}
