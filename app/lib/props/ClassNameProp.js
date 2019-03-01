//imports ----------------------------------------------------------------------

import DomElementProp from './DomElementProp.js';


//exports ----------------------------------------------------------------------

export default class ClassNameProp extends DomElementProp{
  constructor(node){
    super(node);
  }
  onUpdate(currentValue, previousValue){
    if (previousValue){
      this.removeClass(previousValue);
    }
    if (currentValue){
      this.addClass(currentValue);
    }
  }
}
