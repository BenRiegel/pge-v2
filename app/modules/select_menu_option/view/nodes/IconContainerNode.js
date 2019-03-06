//imports ----------------------------------------------------------------------

import DomNode from '../../../../lib/DomNode.js';
import '../stylesheets/option_icon_container.scss';


//exports ----------------------------------------------------------------------

export default class IconContainerNode extends DomNode{
  constructor(){
    super('div', 'icon-container');
  }
  showBorder(){
    this.addClass('border');
  }
  hideBorder(){
    this.removeClass('border');
  }
}
