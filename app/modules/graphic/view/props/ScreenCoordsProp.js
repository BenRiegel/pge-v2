//imports ----------------------------------------------------------------------

import DomElementProp from '../../../../lib/props/DomElementProp.js';


//exports ----------------------------------------------------------------------

export default class ScreenCoordsProp extends DomElementProp{
  constructor(node){
    super(node);
  }
  onUpdate(newValue){
    var translateStr = 'translate(-50%, -50%)';
    translateStr += `translate(${newValue.x}px, ${newValue.y}px)`;
    this.setStyle('transform', translateStr);
  }
}
