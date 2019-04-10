//imports ----------------------------------------------------------------------

import DomNode from '../../../../../lib/utils/DomNode.js';
import '../stylesheets/iframe.scss';


//exports ----------------------------------------------------------------------

export default class IframeNode extends DomNode{
  constructor(){
    super('iframe', 'project-iframe');
  }
}
