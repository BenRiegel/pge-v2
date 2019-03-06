//imports ----------------------------------------------------------------------

import { wait } from './Utils.js';


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

  addDomListener(eventName){
    this.node.addEventListener(eventName, evt => {
      var args = this.clickHandler(evt);
      if (args !== null){
        var listener = this.eventListeners.get(eventName);
        listener(...args);
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

  setHidden(){
    this.node.style.visibility = 'hidden';
  }

  setVisible(){
    this.node.style.visibility = 'visible';
  }

  setOpaque(){
    this.node.style.opacity = '1';
  }

  setTransparent(){
    this.node.style.opacity = '0';
  }

  setStyle(styleName, value){
    this.node.style[styleName] = value;
  }

  transitionSetStyle(styleName, newValue){
    var currentValue = this.node.style[styleName];
    if (currentValue === ''){
      this.node.style[styleName] = newValue;
      return;
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
      await wait(0);
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

};
