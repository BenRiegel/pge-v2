//imports ----------------------------------------------------------------------

import DomNode from '../../../../utils/DomNode.js';


//exports ----------------------------------------------------------------------

export default class IconNode extends DomNode{
  constructor(className){
    super('span', `fa ${className}`);
  }
}
