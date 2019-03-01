//imports ----------------------------------------------------------------------

import DomElementProp from './DomElementProp.js';


//exports ----------------------------------------------------------------------

export default class OpacityProp extends DomElementProp{
  constructor(node){
    super(node);
  }
  onUpdate(newValue){
    this.setStyle('opacity', newValue);
  }
}
