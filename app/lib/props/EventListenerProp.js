//imports ----------------------------------------------------------------------

import DomElementProp from './DomElementProp.js';


//exports ----------------------------------------------------------------------

export default class EventListenerProp extends DomElementProp{

  constructor(node, eventName){
    super(node);
    this.eventName = eventName;
    this.listener = null;
  }

  set(cb){
    this.updateValue(cb)
  }

  onUpdate(currentValue){
    if (this.listener){
      this.node.removeEventListener(this.eventName, this.listener);
    }
    if (currentValue){
      this.listener = currentValue;
      this.node.addEventListener(this.eventName, this.listener);
    }
  }
}
