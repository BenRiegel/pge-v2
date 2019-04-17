//imports ----------------------------------------------------------------------

import DomNode from './DomNode.js';


//exports ----------------------------------------------------------------------

export default class DomNodeTransitions extends DomNode{

  constructor(type, className = ''){
    super(type, className);
    this.transitionListeners = {};
    this.transitionPromises = {};
    this.node.addEventListener('transitionend', this.handleTransitionEnd.bind(this) );
  }

  handleTransitionEnd(evt){
    if (evt.target === this.node){
      var styleName = evt.propertyName;
      var listener = this.transitionListeners[styleName];
      if (listener){
        listener();
      }
    }
  }

  loadTransitionListener(styleName){
    this.transitionPromises[styleName] = new Promise(resolve => {
      this.transitionListeners[styleName] = resolve;
    });
  }

  transitionComplete(styleName){
    return this.transitionPromises[styleName];
  }

  async transitionStyle(styleName, newValue){
    var currentValue = this.node.style[styleName];
    if (newValue !== currentValue){
      this.addClass(`transition-${styleName}`);
      this.loadTransitionListener(styleName);
      this.node.style[styleName] = newValue;
      await this.transitionComplete(styleName);
      this.removeClass(`transition-${styleName}`);
    }
  }

}
