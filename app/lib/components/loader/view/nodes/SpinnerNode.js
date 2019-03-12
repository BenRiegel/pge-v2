//imports ----------------------------------------------------------------------

import DomNode from '../../../../utils/DomNode.js';
import '../stylesheets/spinner.scss';


//exports ----------------------------------------------------------------------

export default class SpinnerNode extends DomNode{
  constructor(){
    super('div', 'spinner');
  }
}
