//imports ----------------------------------------------------------------------

import DomNode from '../../../../lib/DomNode.js';
import { getTargetNode } from '../../../../lib/Utils.js';
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
      this.addClass('rounded-border-radius');
    } else if (newValue === 'default'){
      this.removeClass('rounded-border-radius');
    }
  }
}
