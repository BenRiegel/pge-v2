//imports ----------------------------------------------------------------------

import DomNode from '../../../../utils/DomNode.js';
import '../stylesheets/icon.scss';


//exports ----------------------------------------------------------------------

export default class IconNode extends DomNode{

  constructor(){
    super('span', 'option-icon fa');
  }

  setChar(value){
    if (value === 'check'){
      this.removeClass('fa-sort-desc');
      this.addClass('fa-check');
    } else if (value === 'arrow'){
      this.removeClass('fa-check');
      this.addClass('fa-sort-desc');
    }
  }

  setBorderVisibility(value){
    if (value === 'visible'){
      this.addClass('border');
    } else if (value === 'hidden'){
      this.removeClass('border');
    }
  }

}
