//imports ----------------------------------------------------------------------

import DomNode from '../../../../utils/DomNode.js';
import '../stylesheets/root.scss';


//exports ----------------------------------------------------------------------

export default class RootNode extends DomNode{
  constructor(rootNodeId){
    super('div', null);
    this.node = document.getElementById(rootNodeId);
    this.node.className = 'webmap';
  }
}
