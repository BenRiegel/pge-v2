//imports ----------------------------------------------------------------------

import DomNode from '../../../../lib/DomNode.js';


//exports ----------------------------------------------------------------------

export default class ContainerNode extends DomNode{
  constructor(className, buttonId){
    super('div', `${className}`);
    this.buttonId = buttonId
  }
  clickHandler(){
    var broadcastArgs = ['click', this.buttonId];
    return broadcastArgs;
  }
}
