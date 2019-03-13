//imports ----------------------------------------------------------------------

import DomNode from '../../../../utils/DomNode.js';
import { MIN_POINT_RADIUS } from '../../../graphics_layer/config/GraphicsLayerConfig.js';
import '../stylesheets/location.scss';


//exports ----------------------------------------------------------------------

export default class LocationNode extends DomNode{
  constructor(){
    super('div', 'graphic-location');
    this.setStyle('width', `${ MIN_POINT_RADIUS * 2 }px`);
    this.setStyle('height', `${ MIN_POINT_RADIUS * 2 }px`);
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
