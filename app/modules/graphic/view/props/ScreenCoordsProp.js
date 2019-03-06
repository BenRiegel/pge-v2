//imports ----------------------------------------------------------------------

import DomElementProp from '../../../../lib/props/DomElementProp.js';


//exports ----------------------------------------------------------------------

export default class ScreenCoordsProp extends DomElementProp{
  constructor(node){
    super(node);
  }
  onUpdate(newValue){
    var {x, y} = newValue;
    var translateStr = `translate(-50%, -50%) translate(${x}px, ${y}px)`;
    this.setStyle('transform', translateStr);
  }
}
