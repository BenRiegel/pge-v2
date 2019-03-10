//imports ----------------------------------------------------------------------

import DomNode from '../../../../lib/DomNode.js';
import '../stylesheets/label.scss';


//exports ----------------------------------------------------------------------

export default class LabelNode extends DomNode{
  constructor(label){
    super('div', 'graphic-label');
    this.innerHTML = label;
  }
}
