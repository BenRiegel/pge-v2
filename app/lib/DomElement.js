import { wait } from './Utils.js';
import ObservedVar from './ObservedVar3.js';


export default class DomElement{

  constructor(type, className = ''){
    this.node = document.createElement(type);
    this.node.className = className;
    this.listeners = new Map();
    this.props = {};
  }

  set innerHTML(htmlStr){
    this.node.innerHTML = htmlStr;
  }

  set dataset(obj){
    Object.assign(this.node.dataset, obj);
  }

  setSrc(src){
    this.node.src = src;
  }

  asyncSetSrc(src){
    return new Promise(resolve => {
      var contentLoaded = evt => {
        this.node.removeEventListener('load', contentLoaded);
        resolve();
      };
      this.node.addEventListener('load', contentLoaded);
      this.node.src = src;
    });
  }

  getNodeProp(propName){
    return this.node[propName];
  }

  addEventListener(eventName, listener){
    this.node.addEventListener(eventName, listener);
  }

  removeEventListener(eventName, listener){
    this.node.removeEventListener(eventName, listener);
  }

  setEventListener(eventName, listener){
    this.listeners.set(eventName, listener);
  }

  enableListeners(){
    for (let [eventName, listener] of this.listeners){
      this.node.addEventListener(eventName, listener);
    }
  }

  disableListeners(){
    for (let [eventName, listener] of this.listeners){
      this.node.removeEventListener(eventName, listener);
    }
  }

  setStyle(styleName, value){
    this.node.style[styleName] = value;
  }

  unsetStyle(styleName){
    this.node.style[styleName] = '';
  }

  getStyle(styleName){
    return this.node.style[styleName];
  }

  getComputedStyle(styleName){
    return window.getComputedStyle(this.node, null).getPropertyValue(styleName);
  }

  addClass(className){
    this.node.classList.add(className);
  }

  removeClass(className){
    this.node.classList.remove(className);
  }

  display(type = 'block'){
    this.node.style.display = type;
  }

  setNoDisplay(){
    this.node.style.display = 'none';
  }

  setVisibility(value){
    this.node.style.visibility = value;
  }

  setOpacity(value){
    if (value === 'opaque'){
      this.node.style.opacity = '1';
    } else if (value === 'transparent'){
      this.node.style.opacity = '0';
    }
  }

  async animateOpacity(value){
    if (value === 'opaque'){
      this.node.style.opacity = '1';
      await this.animateAddClass('fade-in');
    } else if (value === 'transparent'){
      this.node.style.opacity = '0';
      await this.animateAddClass('fade-out');
    }
  }

  transitionSetStyle(styleName, fromValue, toValue){
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

  animateAddClass(className){
    return new Promise( resolve => {
      var animationEnded = evt => {
        this.node.removeEventListener('animationend', animationEnded);
        this.node.classList.remove(className);
        resolve();
      }
      this.node.addEventListener('animationend', animationEnded);
      this.node.classList.add(className);
    });
  }

  getDimensions(){
    var rect = this.node.getBoundingClientRect();
    return {
      left: this.node.offsetLeft,
      top: this.node.offsetTop,
      width: rect.width,
      height: rect.height,
    }
  };

  removeAllChildren(){
    while (this.node.firstChild) {
      this.node.removeChild(this.node.firstChild);
    }
  }

  addChildNodes(childNodes){
    var docFragment = document.createDocumentFragment();
    for (var childNode of childNodes){
      docFragment.appendChild(childNode);
    }
    this.node.appendChild(docFragment);
  }

  appendChildNode(childNode){
    this.node.appendChild(childNode);
  }

  addNewProp(propName, listener){
    this.props[propName] = new ObservedVar();
    this.props[propName].listener = listener;
  }

  setPropValue(propName, newValue){
    this.props[propName].set(newValue);
  }

  async setPropValueAsync(propName, newValue, isAnimating){
    this.isAnimating = isAnimating;
    await this.props[propName].setAsync(newValue);
  }

};
