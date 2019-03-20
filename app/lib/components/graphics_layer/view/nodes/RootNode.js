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
      var graphicType = graphicContainer.dataset.type;
      var graphicId = Number(graphicContainer.dataset.id);
      if (this.isListening && this.onClick){
        this.onClick(graphicType, graphicId);
      }
    }
  }
}
