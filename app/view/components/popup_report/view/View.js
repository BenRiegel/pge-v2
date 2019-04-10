//imports ----------------------------------------------------------------------

import Loader from '../../../../lib/components/loader/Loader.js';
import RootNode from './nodes/RootNode.js';
import WindowNode from './nodes/WindowNode.js';
import ContentNode from './nodes/ContentNode.js';
import CloseButtonNode from './nodes/CloseButtonNode.js';
import ContractButtonNode from './nodes/ContractButtonNode.js';
import IframeNode from './nodes/IframeNode.js';


//exports ----------------------------------------------------------------------

export default function PopupReportView(){

  //public api -----------------------------------------------------------------

  this.state = {
    contentHasLoaded: false,
  };

  this.nodes = {
    root: new RootNode(),
    reportWindow: new WindowNode(),
    content: new ContentNode(),
    closeButton: new CloseButtonNode(),
    contractButton: new ContractButtonNode(),
    iframe: new IframeNode(),
  };

  this.subcomponents = {
    loader: new Loader(),
  };

}
