class ClassListVar{
  constructor(node){
    this.node = node;
    this.value = undefined;
  }
  set(newValue){
    if (this.value !== newValue){
      if (this.value){
        this.node.classList.remove(this.value);
      }
      if (newValue){
        this.node.classList.add(newValue);
      }
      this.value = newValue;
    }
  }
}



export default class NodeInstance{

  constructor(type){
    this.rootNode = document.createElement(type);
    //this.classList = new Map();
    this.classList = {};
    this.properties = new Map();
  }

  set className(className){
    this.rootNode.className = className;
  }

  set onClick(newListener){
    var currentListener = this.properties.get('onClick');
    if (currentListener !== newListener){
      if (currentListener){
        this.rootNode.removeEventListener('click', currentListener);
      }
      if (newListener){
        this.rootNode.addEventListener('click', newListener);
      }
      this.properties.set('onClick', newListener);
    }
  }

  set onLoad(listener){
    this.rootNode.addEventListener('load', listener);
  }

  set src(src){
    this.rootNode.src = src;
  }

  set innerHTML(htmlStr){
    this.rootNode.innerHTML = htmlStr;
  }

  set dataset(obj){
    Object.assign(this.rootNode.dataset, obj);
  }

  set classListVars(varNames){
    for (var name of varNames){
      this.classList[name] = new ClassListVar(this.rootNode);
    }
  }

  updateClassList(varName, newValue){
    var currentValue = this.classList.get(varName);
    if (currentValue !== newValue){
      if (currentValue){
        this.rootNode.classList.remove(currentValue);
      }
      if (newValue){
        this.rootNode.classList.add(newValue);
      }
      this.classList.set(varName, newValue);
    }
  }

  addClassName(name){
    this.rootNode.classList.add(name);
  }

  removeClassName(name){
    this.rootNode.classList.remove(name);
  }

  setStyle(styleName, value){
    this.rootNode.style[styleName] = value;
  }

  transitionSetStyle(styleName, newValue){
    var currentValue = this.rootNode.style[styleName];
    if (currentValue === newValue){
      return;
    }
    if (currentValue){     //should this check go here?
      return new Promise( resolve => {
        var transitionEnded = evt => {
          if (evt.propertyName === styleName){
            this.rootNode.removeEventListener('transitionend', transitionEnded);
            resolve();
          }
        }
        this.rootNode.addEventListener('transitionend', transitionEnded);
        this.rootNode.style[styleName] = newValue;
      });
    } else {
      this.rootNode.style[styleName] = newValue;
    }
  }

  animateAddClass(className){
    return new Promise( resolve => {
      var animationEnded = evt => {
        this.rootNode.removeEventListener('animationend', animationEnded);
        resolve();
      }
      this.rootNode.addEventListener('animationend', animationEnded);
      this.rootNode.classList.add(className);
    });
  }

};


/*getComputedStyle(styleName){
  return window.getComputedStyle(this.rootNode, null).getPropertyValue(styleName);
}*/
