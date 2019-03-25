//imports ----------------------------------------------------------------------

import DomNode from '../../../../utils/DomNodeInput.js';
import '../stylesheets/zoom_button.scss';
import '../stylesheets/in_button.scss';


//exports ----------------------------------------------------------------------

export default class InButtonNode extends DomNode{
  constructor(buttonId){
    super('span', 'zoom-button zoom-in fa fa-plus');
    this.setDatasetProp('id', buttonId);
  }
}
