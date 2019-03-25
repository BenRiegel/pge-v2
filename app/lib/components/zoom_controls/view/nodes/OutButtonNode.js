//imports ----------------------------------------------------------------------

import DomNode from '../../../../utils/DomNodeInput.js';
import '../stylesheets/zoom_button.scss';
import '../stylesheets/out_button.scss';


//exports ----------------------------------------------------------------------

export default class OutButtonNode extends DomNode{
  constructor(buttonId){
    super('span', 'zoom-button zoom-out fa fa-minus');
    this.setDatasetProp('id', buttonId);
  }
}
