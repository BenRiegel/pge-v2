//imports ----------------------------------------------------------------------

import DomNode from '../../../../lib/DomNode.js';
import '../stylesheets/arrow.scss';


//exports ----------------------------------------------------------------------

export default class ArrowNode extends DomNode{
  constructor(){
    super('div', 'arrow');
  }
}
