//imports ----------------------------------------------------------------------

import { getTargetNode } from '../../../../utils/Utils.js';
import DomNodeInput from '../../../../utils/DomNodeInput.js';
import '../stylesheets/root.scss';


//exports ----------------------------------------------------------------------

export default class RootNode extends DomNodeInput{
  constructor(className){
    super('div', 'zoom-controls');
  }
  mouseClickHandler(evt){
    var buttonNode = getTargetNode(evt.target, 'zoom-button');
    if (buttonNode){
      var id = buttonNode.dataset.id;
      this.notify('click', id);
    }
  }
}
