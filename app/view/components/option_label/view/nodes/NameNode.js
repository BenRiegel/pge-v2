//imports ----------------------------------------------------------------------

import DomNode from '../../../../../lib/utils/DomNode.js';
import '../stylesheets/name.scss';


//exports ----------------------------------------------------------------------

export default class LabelNameNode extends DomNode{

  constructor(name, isIndented){
    super('div', 'label-name');
    this.innerHTML = name;
    if (isIndented){
      this.addClass('indented');
    }
  }

  setIndentVisibility(value){
    if (value === 'visible'){
      this.addClass('indent-visible');
    } else if (value === 'hidden'){
      this.removeClass('indent-visible');
    }
  }

}
