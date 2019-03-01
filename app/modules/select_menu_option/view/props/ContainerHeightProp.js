//imports ----------------------------------------------------------------------

import DomElementProp from '../../../../lib/props/DomElementProp.js';


//exports ----------------------------------------------------------------------

export default class ContainerHeightProp extends DomElementProp{
  constructor(node, expandedHeightPx){
    super(node);
    this.isTransitioning = undefined;
    this.expandedHeightPx = expandedHeightPx;
  }
  lookupValue(valueCode){
    if (valueCode === 'expanded'){
      return this.expandedHeightPx;
    } else if (valueCode === 'contracted'){
      return '0';
    }
  }
  set(valueCode){
    this.isTransitioning = false;
    var newValue = this.lookupValue(valueCode);
    this.updateValue(newValue);
  }
  transition(valueCode){
    this.isTransitioning = true;
    var newValue = this.lookupValue(valueCode);
    return this.updateValue(newValue);
  }
  onUpdate(newValue, previousValue){
    if (this.isTransitioning){
      return this.transitionSetStyle('height', newValue, previousValue);
    } else {
      this.setStyle('height', newValue);
    }
  }
}
