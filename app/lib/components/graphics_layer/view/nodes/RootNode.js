//imports ----------------------------------------------------------------------

import DomNodeInput from '../../../../utils/DomNodeInput.js';
import { getTargetNode } from '../../../../utils/Utils.js';
import '../stylesheets/root.scss';


//exports ----------------------------------------------------------------------

export default class RootNode extends DomNodeInput{
  constructor(){
    super('div', 'graphics-layer');
  }
  mouseClickHandler(evt){
    var graphicContainer = getTargetNode(evt.target, 'graphic');
    if (graphicContainer){
      this.notify('click', graphicContainer.dataset);
    }
  }
}
