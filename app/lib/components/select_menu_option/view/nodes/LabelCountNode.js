//imports ----------------------------------------------------------------------

import DomNode from '../../../../utils/DomNode.js';
import '../stylesheets/label_count.scss';


//exports ----------------------------------------------------------------------

export default class LabelCountNode extends DomNode{
  constructor(count){
    super('div', 'tag-count');
    this.innerHTML = count;
  }
}
