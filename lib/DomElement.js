import { wait } from './Utils.js';


export default class DomElement{

  constructor(type, className = ''){
    this.node = document.createElement(type);
    this.node.className = className;
    this.listeners = new Map();
  }

  set innerHTML(htmlStr){
    this.node.innerHTML = htmlStr;
  }

  set dataset(obj){
    Object.assign(this.node.dataset, obj);
  }

  addEventListener(eventName, listener){
    this.node.addEventListener(eventName, listener);
  }

  removeEventListener(eventName, listener){
    this.node.removeEventListener(eventName, listener);
  }

  setStyle(styleName, value){
    this.node.style[styleName] = value;
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

  hide(){
    this.node.style.visibility = 'hidden';
  }

  show(){
    this.node.style.visibility = 'visible';
  }

  setOpaque(){
    this.node.style.opacity = '1';
  };

  setTransparent(){
    this.node.style.opacity = '0';
  };

  async fadeIn(){
    await this.animateAddClass('fade-in');
  }

  async fadeOut(){
    await this.animateAddClass('fade-out');
  }

  transitionSetStyle(styleName, newValue){
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

};
