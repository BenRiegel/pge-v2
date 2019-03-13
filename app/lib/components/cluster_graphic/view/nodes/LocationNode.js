//imports ----------------------------------------------------------------------

import DomNode from '../../../../utils/DomNode.js';
import '../stylesheets/location.scss';


//exports ----------------------------------------------------------------------

export default class LocationNode extends DomNode{
  constructor(props){
    super('div', 'graphic-location');
    this.setStyle('width', `${props.renderedRadius * 2}px`);
    this.setStyle('height', `${props.renderedRadius * 2}px`);
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
