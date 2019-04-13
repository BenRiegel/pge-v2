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
      var type = graphicContainer.dataset.type;
      var id = Number(graphicContainer.dataset.id);
      var x = Number(graphicContainer.dataset.x);
      var y = Number(graphicContainer.dataset.y);
      this.notify('click', type, id, {x,y} );
    }
  }
}
