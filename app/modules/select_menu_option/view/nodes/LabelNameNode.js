//imports ----------------------------------------------------------------------

import DomNode from '../../../../lib/DomNode.js';
import '../stylesheets/label_name.scss';


//exports ----------------------------------------------------------------------

export default class LabelNameNode extends DomNode{

  constructor(name){
    super('div', 'tag-name');
    this.innerHTML = name;
  }

  setIndentVisibility(value){
    if (value === 'visible'){
      this.removeClass('indent-hidden');
      this.addClass('indent-visible');
    } else if (value === 'hidden'){
      this.removeClass('indent-visible');
      this.addClass('indent-hidden');
    }
  }

}
