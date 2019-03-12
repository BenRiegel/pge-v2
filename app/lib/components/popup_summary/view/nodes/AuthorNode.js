//imports ----------------------------------------------------------------------

import DomNode from '../../../../utils/DomNode.js';
import '../stylesheets/author.scss';


//exports ----------------------------------------------------------------------

export default class AuthorNode extends DomNode{
  constructor(){
    super('div', 'project-author');
  }
}
