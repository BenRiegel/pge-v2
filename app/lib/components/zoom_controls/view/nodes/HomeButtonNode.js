//imports ----------------------------------------------------------------------

import DomNode from '../../../../utils/DomNode.js';
import '../stylesheets/zoom_button.scss';
import '../stylesheets/home_button.scss';


//exports ----------------------------------------------------------------------

export default class HomeButtonNode extends DomNode{
  constructor(buttonId){
    super('span', 'zoom-button zoom-home fa fa-home');
    this.setDatasetProp('id', buttonId);
  }
}
