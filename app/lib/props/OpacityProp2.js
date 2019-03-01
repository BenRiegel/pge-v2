//imports ----------------------------------------------------------------------

import DomElementProp from './DomElementProp.js';


//exports ----------------------------------------------------------------------

export default class OpacityProp extends DomElementProp{
  constructor(node){
    super(node);
    this.isTransitioning = undefined;
  }
  set(newValue){
    this.isTransitioning = false;
    this.updateValue(newValue);
  }
  transition(newValue){
    this.isTransitioning = true;
    return this.updateValue(newValue);
  }
  onUpdate(newValue, previousValue){
    if (this.isTransitioning){
      return this.transitionSetStyle('opacity', newValue, previousValue);
    } else {
      this.setStyle('opacity', newValue);
    }
  }
}
