//imports ----------------------------------------------------------------------

import DomNode from '../../../../../lib/utils/DomNode.js';
import '../stylesheets/root.scss';


//exports ----------------------------------------------------------------------

export default class RootNode extends DomNode{
  constructor(){
    super('div', 'popup-report-container');
  }
}
