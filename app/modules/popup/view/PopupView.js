//imports ----------------------------------------------------------------------

import Emitter from '../../../lib/Emitter.js';
import ContainerNode from './nodes/ContainerNode.js';
import ArrowNode from './nodes/ArrowNode.js';
import ArrowCoverNode from './nodes/ArrowCoverNode.js';
import Loader from '../../loader/Loader.js';
import SummaryContentNode from './nodes/SummaryContentNode.js';
import ReportContentNode from './nodes/ReportContentNode.js';
import PopupButton from '../../popup_button/PopupButton.js';
import TitleNode from './nodes/TitleNode.js';
import AuthorNode from './nodes/AuthorNode.js';
import ImageNode from './nodes/ImageNode.js';
import TextNode from './nodes/TextNode.js';
import ReadMoreNode from './nodes/ReadMoreNode.js';
import IframeNode from './nodes/IframeNode.js';
import './stylesheets/summary_close_button.scss';
import './stylesheets/report_close_button.scss';
import './stylesheets/report_contract_button.scss';


//exports ----------------------------------------------------------------------

export default function PopupView(mapDimensions){

  //public api -----------------------------------------------------------------

  this.props = {
    inputEnabled: true,
    updateInProgress: false,
    summaryContentHasLoaded: false,
    reportContentHasLoaded: false,
  }

  this.nodes = {
    container: new ContainerNode(mapDimensions),
    arrow: new ArrowNode(),
    arrowCover: new ArrowCoverNode(),
    summaryContent: new SummaryContentNode(),
    title: new TitleNode(),
    author: new AuthorNode(),
    image: new ImageNode(),
    text: new TextNode(),
    readMore: new ReadMoreNode(),
    reportContent: new ReportContentNode(),
    iframe: new IframeNode(),
  };

  this.subcomponents = {
    loader: new Loader(),
    summaryCloseButton: new PopupButton('summary-close-button', 'fa-times', 'close'),
    reportCloseButton: new PopupButton('report-close-button', 'fa-times', 'close'),
    reportContractButton: new PopupButton('report-contract-button', 'fa-compress', 'contract'),
  };

  this.rootNode = this.nodes.container.node;

  this.emitter = {
    public: new Emitter(),
    private: new Emitter(),
  }

}
