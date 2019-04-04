//imports ----------------------------------------------------------------------

import DomNodeInput from '../../../../utils/DomNodeInput.js';
import { getTargetNode } from '../../../../utils/Utils.js';
import '../stylesheets/root.scss';


//exports ----------------------------------------------------------------------

export default class RootNode extends DomNodeInput{
  constructor(){
    super('div', 'select-menu rounded-border-radius');
  }
  mouseClickHandler(evt){
    var optionNode = getTargetNode(evt.target, 'option');
    if (optionNode){
      var optionKey = optionNode.dataset.key;
      this.notify('click', optionKey);
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
