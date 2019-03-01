//imports ----------------------------------------------------------------------

import { wait } from '../Utils.js';


//exports ----------------------------------------------------------------------

export default class DomElementAnimationProp{

  constructor(node){
    this.node = node;
  }

  setAsync(className){
    return new Promise( resolve => {
      var animationEnded = async evt => {
        this.node.removeEventListener('animationend', animationEnded);
        this.node.classList.remove(className);
        await wait(0);
        resolve();
      }
      this.node.addEventListener('animationend', animationEnded);
      this.node.classList.add(className);
    });
  }

};
