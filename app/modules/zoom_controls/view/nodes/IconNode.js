//imports ----------------------------------------------------------------------

import DomNode from '../../../../lib/DomNode.js';
import '../stylesheets/zoom_button_icon.scss';


//exports ----------------------------------------------------------------------

export default class IconNode extends DomNode{
  constructor(className){
    super('span', `fa ${className}`);
  }
}
