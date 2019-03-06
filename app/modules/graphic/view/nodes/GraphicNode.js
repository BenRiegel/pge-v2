//imports ----------------------------------------------------------------------

import DomNode from '../../../../lib/DomNode.js';
import { BASELINE_DIAMETER_PX } from '../../config/GraphicConfig.js';
import '../stylesheets/graphic.scss';


//exports ----------------------------------------------------------------------

export default class GraphicNode extends DomNode{
  constructor(props){
    super('div', 'graphic');
    this.setStyle('width', `${BASELINE_DIAMETER_PX}px`);
    this.setStyle('height', `${BASELINE_DIAMETER_PX}px`);
  }
  setHighlight(){
    this.addClass('highlight');
  }
  setNoHighlight(){
    this.removeClass('highlight');
  }
  setScale(newValue){
    this.setStyle('transform', `scale(${newValue, newValue})`);
  }
}
