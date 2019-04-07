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

  set isTransitioning(value){  //this needs tobe changed along with transition complete
    this.node.style.transitionDuration = (value === true) ? '' : '0s';
  }

  setOpacity(newValue, isTransitioning = false){
    this.isTransitioning = isTransitioning;
    this.node.style.opacity = newValue;
    if (isTransitioning){
      return this.transitionComplete('opacity');
    }
  }

  setStyle(styleName, newValue, isTransitioning = false){
    var currentValue = this.node.style[styleName];
  //  console.log(styleName, currentValue, newValue);
    if (newValue !== currentValue){
      this.isTransitioning = isTransitioning;
      this.node.style[styleName] = newValue;
      if (isTransitioning){
        return this.transitionComplete(styleName);
      }
    }
  }
};
