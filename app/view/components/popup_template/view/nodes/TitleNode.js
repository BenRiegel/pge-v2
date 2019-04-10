//imports ----------------------------------------------------------------------

import DomNode from '../../../../../lib/utils/DomNode.js';
import '../stylesheets/title.scss';


//exports ----------------------------------------------------------------------

export default class TitleNode extends DomNode{
  constructor(){
    super('div', 'project-title');
  }
}
