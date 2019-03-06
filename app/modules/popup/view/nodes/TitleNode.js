//imports ----------------------------------------------------------------------

import DomNode from '../../../../lib/DomNode.js';
import '../stylesheets/title.scss';


//exports ----------------------------------------------------------------------

export default class TitleNode extends DomNode{
  constructor(){
    super('div', 'project-title');
  }
}
