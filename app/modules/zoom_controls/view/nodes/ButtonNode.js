//imports ----------------------------------------------------------------------

import DomNode from '../../../../lib/DomNode.js';
import '../stylesheets/zoom_button_container.scss';


//exports ----------------------------------------------------------------------

export default class ButtonNode extends DomNode{
  constructor(className, buttonId){
    super('div', `zoom-button ${className}`);
    this.buttonId = buttonId;
  }
  clickHandler(){
    var broadcastArgs = [this.buttonId];
    return broadcastArgs;
  }
}
