//imports ----------------------------------------------------------------------

import DomNode from '../../../../lib/DomNode.js';
import '../stylesheets/spinner.scss';


//exports ----------------------------------------------------------------------

export default class SpinnerNode extends DomNode{
  constructor(){
    super('div', 'spinner');
  }
}
