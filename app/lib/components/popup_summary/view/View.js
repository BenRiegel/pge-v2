//imports ----------------------------------------------------------------------

import ObservedObj from '../../../utils/ObservedObj.js';
import RootNode from './nodes/RootNode.js';
import ContentNode from './nodes/ContentNode.js';
import TitleNode from './nodes/TitleNode.js';
import AuthorNode from './nodes/AuthorNode.js';
import ImageNode from './nodes/ImageNode.js';
import TextNode from './nodes/TextNode.js';
import ReadMoreNode from './nodes/ReadMoreNode.js';
import Loader from '../../loader/Loader.js';
import CloseButton from './subcomponents/CloseButton.js';


//exports ----------------------------------------------------------------------

export default function PopupSummaryView(popupViewState){

  //public api -----------------------------------------------------------------

  this.state = new ObservedObj({
    contentHasLoaded: false,
  });

  this.nodes = {
    root: new RootNode(),
    content: new ContentNode(),
    title: new TitleNode(),
    author: new AuthorNode(),
    image: new ImageNode(),
    text: new TextNode(),
    readMore: new ReadMoreNode(),
  };

  this.subcomponents = {
    loader: new Loader(),
    closeButton: new CloseButton(popupViewState),
  };

}
