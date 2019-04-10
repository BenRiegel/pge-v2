//imports ----------------------------------------------------------------------

import DomNode from '../../../../../lib/utils/DomNode.js';
import '../stylesheets/text.scss';


//exports ----------------------------------------------------------------------

export default class TextNode extends DomNode{
  constructor(){
    super('span', 'project-text');
  }
}
