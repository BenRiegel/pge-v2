//imports ----------------------------------------------------------------------

import DomNode from '../../../../utils/DomNode.js';
import '../stylesheets/label.scss';


//exports ----------------------------------------------------------------------

export default class LabelNode extends DomNode{
  constructor(){
    super('div', 'graphic-label');
    this.innerHTML = '1';
  }
}
