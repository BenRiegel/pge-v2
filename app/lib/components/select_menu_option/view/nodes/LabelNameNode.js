//imports ----------------------------------------------------------------------

import DomNode from '../../../../utils/DomNode.js';
import '../stylesheets/label_name.scss';


//exports ----------------------------------------------------------------------

export default class LabelNameNode extends DomNode{

  constructor(name, isIndented){
    var indentedClass = isIndented ? 'indented' : '';
    super('div', `tag-name ${indentedClass}`);
    this.innerHTML = name;
  }

  setIndentStyle(value){
    if (value === 'visible'){
      this.addClass('indent-visible');
    } else if (value === 'hidden'){
      this.removeClass('indent-visible');
    }
  }

}
