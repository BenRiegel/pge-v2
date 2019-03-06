//imports ----------------------------------------------------------------------

import DomNode from '../../../../lib/DomNode.js';


//exports ----------------------------------------------------------------------

export default class IconNode extends DomNode{
  constructor(className){
    super('span', `fa ${className}`);
  }
}
