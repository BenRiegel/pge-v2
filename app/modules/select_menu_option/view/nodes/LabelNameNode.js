//imports ----------------------------------------------------------------------

import DomNode from '../../../../lib/DomNode.js';
import '../stylesheets/option_label_name.scss';


//exports ----------------------------------------------------------------------

export default class LabelNameNode extends DomNode{
  constructor(name){
    super('div', 'tag-name');
    this.innerHTML = name;
  }
  showIndent(){
    this.removeClass('indent-hidden');
    this.addClass('indent-visible');
  }
  hideIndent(){
    this.removeClass('indent-visible');
    this.addClass('indent-hidden');
  }
}
