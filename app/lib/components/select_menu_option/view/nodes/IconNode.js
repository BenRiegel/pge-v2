//imports ----------------------------------------------------------------------

import DomNode from '../../../../utils/DomNode.js';
import '../stylesheets/icon.scss';


//exports ----------------------------------------------------------------------

export default class IconNode extends DomNode{

  constructor(){
    super('span', 'fa fa-sort-desc');
  }

  setChar(value){
    if (value === 'check'){
      this.className = 'fa fa-check';
    } else if (value === 'arrow'){
      this.className = 'fa fa-sort-desc';
    }
  }

}
