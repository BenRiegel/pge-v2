//imports ----------------------------------------------------------------------

import DomNode from '../../../../utils/DomNode.js';
import '../stylesheets/text.scss';


//exports ----------------------------------------------------------------------

export default class TextNode extends DomNode{
  constructor(){
    super('span', 'project-text');
  }
}
