//imports ----------------------------------------------------------------------

import DomNode from '../../../../utils/DomNode.js';
import { BASELINE_DIAMETER_PX } from '../../config/GraphicConfig.js';
import '../stylesheets/location.scss';


//exports ----------------------------------------------------------------------

export default class LocationNode extends DomNode{
  constructor(props){
    super('div', 'graphic-location');
    this.setStyle('width', `${BASELINE_DIAMETER_PX}px`);
    this.setStyle('height', `${BASELINE_DIAMETER_PX}px`);
  }
  setHighlight(isHighlighted){
    if (isHighlighted){
      this.addClass('highlight');
    } else {
      this.removeClass('highlight');
    }
  }
  setScale(newValue){
    this.setStyle('transform', `scale(${newValue, newValue})`);
  }
}
