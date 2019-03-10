//imports ----------------------------------------------------------------------

import DomNode from '../../../../lib/DomNode.js';


//exports ----------------------------------------------------------------------

export default class RootNode extends DomNode{

  constructor(className, buttonId){
    super('div', `${className}`);
  }

  clickHandler(){
    var broadcastArgs = [];
     return broadcastArgs;
  }

}
