//imports ----------------------------------------------------------------------

import DomNode from '../../../../lib/DomNode.js';
import '../stylesheets/option_icon.scss';


//module code block ------------------------------------------------------------

const ARROW_CLASS_NAME = 'fa-sort-desc';
const CHECK_CLASS_NAME = 'fa-check';


//exports ----------------------------------------------------------------------

export default class IconNode extends DomNode{
  constructor(){
    super('span', 'icon fa');
  }
  setChar(value){
    if (value === 'check'){
      this.removeClass(ARROW_CLASS_NAME);
      this.addClass(CHECK_CLASS_NAME);
    } else {
      this.removeClass(CHECK_CLASS_NAME);
      this.addClass(ARROW_CLASS_NAME);
    }
  }
}
