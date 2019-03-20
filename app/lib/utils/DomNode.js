//imports ----------------------------------------------------------------------

import { wait, capitalize } from './Utils.js';


//exports ----------------------------------------------------------------------

export default class DomNode{

  constructor(type, className = ''){
    this.node = document.createElement(type);
    this.node.className = className;
    if (this.clickHandler){
      this.addDomListener('click');
    }
    this.eventListeners = new Map();
  }

  set className(className){
    this.node.className = className;
  }

  addDomListener(eventName){
    var callbackName = 'on' + capitalize(eventName);
    this.node.addEventListener(eventName, evt => {
      if (this.isListening){
        var args = this.clickHandler(evt);
        if (args !== null){
          this[callbackName](...args);
        }
      }
    });
  }

  setEventListener(eventName, listener){
    this.eventListeners.set(eventName, listener);
  }


  set innerHTML(innerHTML){
    this.node.innerHTML = innerHTML;
  }

  setDatasetProp(propName, value){
    this.node.dataset[propName] = value;
  }

  setVisibility(newValue){
    this.node.style.visibility = newValue;
  }

  setOpacity(newValue){
    this.node.style.opacity = newValue;
  }

  async transitionOpacity(newValue){
    this.addClass('transition-opacity');
    await this.transitionSetStyle('opacity', newValue);
    this.removeClass('transition-opacity');
  }

  setStyle(styleName, value){
    this.node.style[styleName] = value;
  }

  transitionSetStyle(styleName, newValue){
    var currentValue = this.node.style[styleName];
    if (currentValue === ''){
        //this.node.style[styleName] = newValue;
        //return;
    }
    if (currentValue === newValue){
      return;
    }
    return new Promise( async resolve => {
      var transitionEnded = evt => {
        if (evt.propertyName === styleName){
          this.node.removeEventListener('transitionend', transitionEnded);
          resolve();
        }
      }
      this.node.addEventListener('transitionend', transitionEnded);
    //  await wait(0);
      this.node.style[styleName] = newValue;
    });
  }

  addClass(className){
    if (className){
      this.node.classList.add(className);
    }
  }

  removeClass(className){
    if (className){
      this.node.classList.remove(className);
    }
  }

  transitionModifyClassList(className, actionName, styleList){
    return new Promise( async resolve => {
      var transitionEnded = evt => {
        var transitionedStyleName = evt.propertyName;
        styleList = styleList.filter(style => style !== transitionedStyleName);
        if (styleList.length === 0){
          this.node.removeEventListener('transitionend', transitionEnded);
          resolve();
        }
      }
      this.node.addEventListener('transitionend', transitionEnded);
    //  await wait(0);
      this.node.classList[actionName](className);
    });
  }

  transitionAddClass(className, styleList){
    return this.transitionModifyClassList(className, 'add', styleList);
  }

  transitionRemoveClass(className, styleList){
    return this.transitionModifyClassList(className, 'remove', styleList);
  }

  removeAllChildNodes(){
    while (this.node.firstChild) {
      this.node.removeChild(this.node.firstChild);
    }
  }

  appendChildNode(childNode){
    this.node.appendChild(childNode);
  }

  appendChildNodes(childNodes){
    var docFragment = document.createDocumentFragment();
    for (var childNode of childNodes){
      docFragment.appendChild(childNode);
    }
    this.node.appendChild(docFragment);
  }

  setSrc(src){
    return new Promise(resolve => {
      var contentLoaded = evt => {
        this.node.removeEventListener('load', contentLoaded);
        resolve();
      };
      this.node.addEventListener('load', contentLoaded);
      this.node.src = src;
    });
  }

  getProp(propName){
    return this.node[propName];
  }

  getComputedStyle(styleName){
    return window.getComputedStyle(this.node, null).getPropertyValue(styleName);
  }


};
