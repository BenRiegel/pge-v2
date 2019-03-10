//imports ----------------------------------------------------------------------

import DomNode from '../../../../lib/DomNode.js';
import '../stylesheets/read_more.scss';


//exports ----------------------------------------------------------------------

export default class ReadMoreNode extends DomNode{
  constructor(){
    super('span', 'read-more-text');
    this.innerHTML = 'Read more';
  }
  clickHandler(){
    var broadcastArgs = ['expand'];
    return broadcastArgs;
  }
}
