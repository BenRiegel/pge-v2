//imports ----------------------------------------------------------------------

import DomNode from '../../../../../lib/utils/DomNode.js';
import '../stylesheets/expanded_window.scss';


//exports ----------------------------------------------------------------------

export default class ExpandedWindowNode extends DomNode{
  constructor(){
    super('div', 'expanded-window');
  }
}
