//imports ----------------------------------------------------------------------

import DomElementProp from './DomElementProp.js';


//exports ----------------------------------------------------------------------

export default class VisibilityProp extends DomElementProp{
  constructor(node){
    super(node);
  }
  onUpdate(newValue){
    this.setStyle('visibility', newValue);
  }
}
