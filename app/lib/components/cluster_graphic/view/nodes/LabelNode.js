//imports ----------------------------------------------------------------------

import DomNode from '../../../../utils/DomNode.js';
import '../../../point_graphic/view/stylesheets/label.scss';


//exports ----------------------------------------------------------------------

export default class LabelNode extends DomNode{
  constructor(label){
    super('div', 'graphic-label');
    this.innerHTML = label;
  }
}
