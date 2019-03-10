//imports ----------------------------------------------------------------------

import DomNode from '../../../../lib/DomNode.js';
import '../stylesheets/button_container.scss';


//exports ----------------------------------------------------------------------

export default class ButtonContainerNode extends DomNode{
  constructor(){
    super('div', 'zoom-button-container');
  }
}
