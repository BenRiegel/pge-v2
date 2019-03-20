//imports ----------------------------------------------------------------------

import Emitter from '../../../utils/Emitter2.js';
import ObservedObj from '../../../utils/ObservedObj.js';
import RootNode from './nodes/RootNode.js';
import PopupNode from './nodes/PopupNode.js';
import ArrowNode from './nodes/ArrowNode.js';
import ContentNode from './nodes/ContentNode.js';
import PopupReport from '../../popup_report/PopupReport.js';
import PopupSummary from '../../popup_summary/PopupSummary.js';


//exports ----------------------------------------------------------------------

export default function PopupView(model){

  //public api -----------------------------------------------------------------

  this.state = new ObservedObj({
    userDisabled: false,
    actionInProgress: false,
  });

  this.emitter = new Emitter( ['open', 'closed', 'actionStart', 'actionEnd'] );

  this.nodes = {
    root: new RootNode(),
    popup: new PopupNode(),
    arrow: new ArrowNode(),
    content: new ContentNode(),
  };

  this.subcomponents = {
    summary: new PopupSummary(model, this.state),
    report: new PopupReport(model, this.state),
  };

}
