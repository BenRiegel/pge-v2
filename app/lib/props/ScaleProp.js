//imports ----------------------------------------------------------------------

import DomElementProp from './DomElementProp.js';


//exports ----------------------------------------------------------------------

export default class ScaleProp extends DomElementProp{
  constructor(node){
    super(node);
  }
  onUpdate(newValue){
    this.setStyle('transform', `scale(${newValue, newValue})`);
  }
}
