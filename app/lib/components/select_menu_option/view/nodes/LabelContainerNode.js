//imports ----------------------------------------------------------------------

import DomNode from '../../../../utils/DomNode.js';
import '../stylesheets/label_container.scss';


//exports ----------------------------------------------------------------------

export default class LabelContainerNode extends DomNode{
  constructor(){
    super('div', 'label');
  }
}
