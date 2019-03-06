//imports ----------------------------------------------------------------------

import DomNode from '../../../../lib/DomNode.js';
import { getTargetNode } from '../../../../lib/Utils.js';
import '../stylesheets/select_menu.scss';


//exports ----------------------------------------------------------------------

export default class ContainerNode extends DomNode{
  constructor(){
    super('div', 'select-menu-container');
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
  setRoundedBorderRadius(){
    this.addClass('rounded-border-radius');
  }
  setDefaultBorderRadius(){
    this.removeClass('rounded-border-radius');
  }
}
