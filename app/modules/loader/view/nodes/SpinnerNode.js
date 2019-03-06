//imports ----------------------------------------------------------------------

import DomNode from '../../../../lib/DomNode.js';
import '../stylesheets/loader_spinner.scss';


//exports ----------------------------------------------------------------------

export default class LoaderSpinnerNode extends DomNode{
  constructor(){
    super('div', 'loader-spinner');
  }
}
