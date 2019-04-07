//imports ----------------------------------------------------------------------

import DomNode from '../../../../../lib/utils/DomNode.js';
import '../stylesheets/count.scss';


//exports ----------------------------------------------------------------------

export default class CountNode extends DomNode{
  constructor(count){
    super('div', 'label-count');
    this.innerHTML = count;
  }
}
