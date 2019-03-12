//imports ----------------------------------------------------------------------

import DomNode from '../../../../utils/DomNode.js';
import '../stylesheets/root.scss';


//exports ----------------------------------------------------------------------

export default class RootNode extends DomNode{
  constructor(className){
    super('div', 'zoom-controls');
  }
}
