//imports ----------------------------------------------------------------------

import DomElementProp from './DomElementProp.js';


//exports ----------------------------------------------------------------------

export default class ChildrenProp extends DomElementProp{
  constructor(node){
    super(node);
  }

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

  onUpdate(currentValue){
    this.removeAllChildren();
    this.addChildNodes(currentValue);
  }
}
