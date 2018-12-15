//imports ----------------------------------------------------------------------

import { wait } from './Utils.js';


//exports ----------------------------------------------------------------------

export function transitionSetStyle(element, styleName, newValue){
  return new Promise( async resolve => {
    var transitionEnded = evt => {
      if (evt.propertyName === styleName){
        element.removeEventListener('transitionend', transitionEnded);
        resolve();
      }
    }
    element.addEventListener('transitionend', transitionEnded);
    await wait(0);
    element.style[styleName] = newValue;
  });
};

export function animateAddClass(element, className){
  return new Promise( resolve => {
    var animationEnded = evt => {
      element.removeEventListener('animationend', animationEnded);
      resolve();
    }
    element.addEventListener('animationend', animationEnded);
    element.classList.add(className);
  });
};

export function getParentNodeProperty(node, className, prop){
  while (node){
    if (node.classList && node.classList.contains(className)){
      return node.dataset[prop];
    }
    node = node.parentNode;
  }
  return null;
};

export function getDimensions(node){
  var rect = node.getBoundingClientRect();
  return {
    left: node.offsetLeft,
    top: node.offsetTop,
    width: rect.width,
    height: rect.height,
  }
};

export function addChildrenTo(parentNode, childNodes){
  var docFragment = document.createDocumentFragment();
  for (var childNode of childNodes){
    docFragment.appendChild(childNode);
  }
  parentNode.appendChild(docFragment);
};
