//imports ----------------------------------------------------------------------

import DomElementProp from '../../../../lib/props/DomElementProp.js';


//module code block ------------------------------------------------------------

const ARROW_CLASS_NAME = 'fa-sort-desc';
const CHECK_CLASS_NAME = 'fa-check';


//exports ----------------------------------------------------------------------

export default class IconCharProp extends DomElementProp{
  constructor(node){
    super(node);
  }
  onUpdate(newValue){
    if (newValue === 'check'){
      this.removeClass(ARROW_CLASS_NAME);
      this.addClass(CHECK_CLASS_NAME);
    } else {
      this.removeClass(CHECK_CLASS_NAME);
      this.addClass(ARROW_CLASS_NAME);
    }
  }
}
