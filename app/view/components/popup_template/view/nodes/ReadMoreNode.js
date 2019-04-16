//imports ----------------------------------------------------------------------

import DomNode from '../../../../../lib/utils/DomNode.js';
import '../stylesheets/read_more.scss';


//exports ----------------------------------------------------------------------

export default class ReadMoreNode extends DomNode{
  constructor(){
    super('a', 'read-more-text');
    this.innerHTML = 'Read more';
    this.setProp('target', '_blank');
  }
}
