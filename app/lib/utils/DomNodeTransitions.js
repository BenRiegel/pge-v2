//imports ----------------------------------------------------------------------

import DomNode from './DomNode.js';


//exports ----------------------------------------------------------------------

export default class DomNodeAnimations extends DomNode{

  constructor(type, className = ''){
    super(type, className);
    this.transitionListeners = {};
    this.node.addEventListener('transitionend', this.transitionEnded.bind(this) );
  }

  transitionEnded(evt){
    var styleName = evt.propertyName;
    var listener = this.transitionListeners[styleName];
    if (listener){
      listener();
    }
  }

  transitionComplete(styleName){
    return new Promise(resolve => {
      this.transitionListeners[styleName] = resolve;
    });
  }

  set isTransitioning(value){
    this.node.style.transitionDuration = (value === true) ? '' : '0s';
  }

  setOpacity(newValue, isTransitioning = false){
    this.isTransitioning = isTransitioning;
    this.node.style.opacity = newValue;
    if (isTransitioning){
      return this.transitionComplete('opacity');
    }
  }

  setStyle(styleName, value, isTransitioning = false){
    this.isTransitioning = isTransitioning;
    this.node.style[styleName] = value;
    if (isTransitioning){
      return this.transitionComplete(styleName);
    }
  }
};
