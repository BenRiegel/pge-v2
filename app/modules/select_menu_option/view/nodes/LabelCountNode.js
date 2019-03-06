//imports ----------------------------------------------------------------------

import DomNode from '../../../../lib/DomNode.js';
import '../stylesheets/option_label_count.scss';


//exports ----------------------------------------------------------------------

export default class LabelCountNode extends DomNode{
  constructor(count){
    super('div', 'tag-count');
    this.innerHTML = count;
  }
}
