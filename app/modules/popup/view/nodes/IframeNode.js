//imports ----------------------------------------------------------------------

import DomNode from '../../../../lib/DomNode.js';
import '../stylesheets/popup_report_iframe.scss';


//exports ----------------------------------------------------------------------

export default class IframeNode extends DomNode{
  constructor(){
    super('iframe', 'project-iframe');
  }
}
