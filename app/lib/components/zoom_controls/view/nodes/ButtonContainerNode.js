//imports ----------------------------------------------------------------------

import DomNode from '../../../../utils/DomNode.js';
import '../stylesheets/button_container.scss';


//exports ----------------------------------------------------------------------

export default class ButtonContainerNode extends DomNode{
  constructor(){
    super('div', 'zoom-button-container');
  }
}
