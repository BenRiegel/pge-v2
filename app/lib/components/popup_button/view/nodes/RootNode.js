//imports ----------------------------------------------------------------------

import DomNode from '../../../../utils/DomNode.js';


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
