//imports ----------------------------------------------------------------------

import DomNode from '../../../../utils/DomNode.js';
import '../stylesheets/label_name.scss';


//exports ----------------------------------------------------------------------

export default class LabelNameNode extends DomNode{

  constructor(name){
    super('div', 'tag-name');
    this.innerHTML = name;
  }

  setIndentStyle(value){
    if (value === 'none'){
      this.className = 'tag-name';
    } else if (value === 'visible'){
      this.className = 'tag-name indent-visible';
    } else if (value === 'hidden'){
      this.className = 'tag-name indent-hidden';
    }
  }

}
