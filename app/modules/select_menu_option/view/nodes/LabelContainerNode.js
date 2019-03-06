//imports ----------------------------------------------------------------------

import DomNode from '../../../../lib/DomNode.js';
import '../stylesheets/option_label_container.scss';


//exports ----------------------------------------------------------------------

export default class LabelContainerNode extends DomNode{
  constructor(){
    super('div', 'label');
  }
}
