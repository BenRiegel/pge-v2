//imports ----------------------------------------------------------------------

import DomNode from '../../../../lib/DomNode.js';
import '../stylesheets/content.scss';


//exports ----------------------------------------------------------------------

export default class ContentNode extends DomNode{
  constructor(){
    super('div', 'report-content');
  }
}
