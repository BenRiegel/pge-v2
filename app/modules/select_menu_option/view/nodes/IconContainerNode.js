//imports ----------------------------------------------------------------------

import DomNode from '../../../../lib/DomNode.js';
import '../stylesheets/icon_container.scss';


//exports ----------------------------------------------------------------------

export default class IconContainerNode extends DomNode{

  constructor(){
    super('div', 'icon-container');
  }

  setBorderVisibility(value){
    if (value === 'visible'){
      this.addClass('border');
    } else if (value === 'hidden'){
      this.removeClass('border');
    }
  }

}
