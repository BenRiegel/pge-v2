//imports ----------------------------------------------------------------------

import ObservedObj from '../../../utils/ObservedObj.js';
import Loader from '../../loader/Loader.js';
import RootNode from './nodes/RootNode.js';
import ContentNode from './nodes/ContentNode.js';
import IframeNode from './nodes/IframeNode.js';
import CloseButton from './subcomponents/CloseButton.js';
import ContractButton from './subcomponents/ContractButton.js';


//exports ----------------------------------------------------------------------

export default function PopupReportView(popupViewState){

  //public api -----------------------------------------------------------------

  this.state = new ObservedObj({
    contentHasLoaded: false,
  });

  this.nodes = {
    root: new RootNode(),
    content: new ContentNode(),
    iframe: new IframeNode(),
  };

  this.subcomponents = {
    loader: new Loader(),
    closeButton: new CloseButton(popupViewState),
    contractButton: new ContractButton(popupViewState),
  };

}
