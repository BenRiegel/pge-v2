//imports ----------------------------------------------------------------------

import DomNode from '../../../../utils/DomNode.js';
import '../stylesheets/arrow.scss';


//exports ----------------------------------------------------------------------

export default class ArrowNode extends DomNode{
  constructor(){
    super('div', 'arrow');
  }
}
