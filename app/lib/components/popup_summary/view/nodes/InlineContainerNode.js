//imports ----------------------------------------------------------------------

import DomNode from '../../../../utils/DomNode.js';
import '../stylesheets/inline_container.scss';


//exports ----------------------------------------------------------------------

export default class InlineContainerNode extends DomNode{
  constructor(){
    super('div', 'inline-container');
  }
}
