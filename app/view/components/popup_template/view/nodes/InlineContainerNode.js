//imports ----------------------------------------------------------------------

import DomNode from '../../../../../lib/utils/DomNode.js';
import '../stylesheets/inline_container.scss';


//exports ----------------------------------------------------------------------

export default class InlineContainerNode extends DomNode{
  constructor(){
    super('div', 'inline-container');
  }
}
