//imports ----------------------------------------------------------------------

import DomNode from '../../../../utils/DomNode.js';
import '../stylesheets/content_container.scss';


//exports ----------------------------------------------------------------------

export default class ContentContainerNode extends DomNode{
  constructor(){
    super('div', 'content-container');
  }
}
