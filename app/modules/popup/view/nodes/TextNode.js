//imports ----------------------------------------------------------------------

import DomNode from '../../../../lib/DomNode.js';
import '../stylesheets/text.scss';


//exports ----------------------------------------------------------------------

export default class TextNode extends DomNode{
  constructor(){
    super('span', 'project-text');
  }
}
