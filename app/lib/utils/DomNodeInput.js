//imports ----------------------------------------------------------------------

import DomNode from './DomNode.js';


//exports ----------------------------------------------------------------------

export default class DomNodeInput extends DomNode{
  constructor(type, className){
    super(type, className);
    this.configureListeners();
    this.listeners = {};
  }
  setListener(eventName, listener){
    this.listeners[eventName] = listener;
  }
  notify(eventName, ...args){
    var listener = this.listeners[eventName];
    if (listener){
      return listener(...args);
    }
  }
  configureListeners(){
    if (this.mouseClickHandler){
      this.node.addEventListener('click', this.mouseClickHandler.bind(this));
    }
    if (this.mouseDownHandler){
      this.node.addEventListener('mousedown', this.mouseDownHandler.bind(this));
    }
    if (this.mouseUpHandler){
      this.node.addEventListener('mouseup', this.mouseUpHandler.bind(this));
    }
    if (this.mouseOutHandler){
      this.node.addEventListener('mouseout', this.mouseOutHandler.bind(this));
    }
  }

};
