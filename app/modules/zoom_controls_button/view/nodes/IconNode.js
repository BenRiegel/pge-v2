//imports ----------------------------------------------------------------------

import DomNode from '../../../../lib/DomNode.js';
import '../stylesheets/icon.scss';


//exports ----------------------------------------------------------------------

export default class IconNode extends DomNode{
  constructor(className){
    super('span', `fa ${className}`);
  }
}
