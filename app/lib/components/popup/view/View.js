//imports ----------------------------------------------------------------------

import Loader from '../../loader/Loader.js';
import RootNode from './nodes/RootNode.js';
import ArrowNode from './nodes/ArrowNode.js';
import ContentNode from './nodes/ContentNode.js';
import CloseButtonNode from './nodes/CloseButtonNode.js';
import TemplateContainerNode from './nodes/TemplateContainerNode.js';


//exports ----------------------------------------------------------------------

export default function PopupView(template){

  //public api -----------------------------------------------------------------

  this.nodes = {
    root: new RootNode(),
    arrow: new ArrowNode(),
    content: new ContentNode(),
    templateContainer: new TemplateContainerNode(),
    closeButton: new CloseButtonNode(),
  };

  this.subcomponents = {
    template,
    loader: new Loader(),
  };

}
