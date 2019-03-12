//imports ----------------------------------------------------------------------

import DomNode from '../../../../utils/DomNode.js';
import { getTargetNode } from '../../../../utils/Utils.js';
import '../stylesheets/root.scss';


//exports ----------------------------------------------------------------------

export default class RootNode extends DomNode{
  constructor(){
    super('div', 'select-menu');
  }
  clickHandler(evt){
    var optionNode = getTargetNode(evt.target, 'option');
    if (optionNode){
      var optionKey = optionNode.dataset.key;
      var broadcastArgs = [optionKey];
      return broadcastArgs;
    } else {
      return null;
    }
  }
  setBorderRadius(newValue){
    if (newValue === 'rounded'){
      this.className = 'select-menu rounded-border-radius';
    } else if (newValue === 'default'){
      this.className = 'select-menu default-border-radius';
    }
  }
}
