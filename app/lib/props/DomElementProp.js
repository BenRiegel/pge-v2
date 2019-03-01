//imports ----------------------------------------------------------------------

import { wait } from '../Utils.js';


//exports ----------------------------------------------------------------------

export default class DomElementProp{

  constructor(node){
    this.node = node;
    this.value = undefined;
    this.previousValue = undefined;
  }

  updateValue(newValue){
    this.previousValue = this.value;
    if (newValue !== this.value){
      this.value = newValue;
      return this.onUpdate(this.value, this.previousValue);
    }
  }

  set(newValue){
    this.updateValue(newValue);
  }

  setStyle(styleName, value){
    this.node.style[styleName] = value;
  }

  transitionSetStyle(styleName, toValue, fromValue){
    return new Promise( async resolve => {
      var transitionEnded = evt => {
        if (evt.propertyName === styleName){
          this.node.removeEventListener('transitionend', transitionEnded);
          resolve();
        }
      }
      this.node.style[styleName] = fromValue;
      this.node.addEventListener('transitionend', transitionEnded);
      await wait(0);
      this.node.style[styleName] = toValue;
    });
  };

  addClass(className){
    this.node.classList.add(className);
  }

  removeClass(className){
    this.node.classList.remove(className);
  }

};
