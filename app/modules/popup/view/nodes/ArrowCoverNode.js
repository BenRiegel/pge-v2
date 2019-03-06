//imports ----------------------------------------------------------------------

import DomNode from '../../../../lib/DomNode.js';
import '../stylesheets/arrow_cover.scss';


//exports ----------------------------------------------------------------------

export default class ArrowCoverNode extends DomNode{
  constructor(){
    super('div', 'arrow-cover');
  }
}
