//imports ----------------------------------------------------------------------

import DomNode from '../../../../../lib/utils/DomNode.js';
import '../stylesheets/image.scss';


//exports ----------------------------------------------------------------------

export default class ImageNode extends DomNode{
  constructor(){
    super('img', 'project-image');
  }
}
