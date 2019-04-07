//imports ----------------------------------------------------------------------

import DomNode from '../../../../../lib/utils/DomNode.js';
import '../stylesheets/root.scss';


//exports ----------------------------------------------------------------------

export default class LabelContainerNode extends DomNode{
  constructor(){
    super('div', 'option-label');
  }
}
