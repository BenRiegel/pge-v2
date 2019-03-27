//imports ----------------------------------------------------------------------

import DomNodeTransitions from '../../../../utils/DomNodeTransitions.js';
import '../stylesheets/popup.scss';


//exports ----------------------------------------------------------------------

export default class PopupNode extends DomNodeTransitions{
  constructor(){
    super('div', 'popup');
  }
  setZIndex(value){
    if (value === 'expanded'){
      this.addClass('expanded-z');
    } else if (value === 'contracted'){
      this.removeClass('expanded-z');
    }
  }
  setStyle(styleName, value, isTransitioning = false){
    this.isTransitioning = isTransitioning;
    this.node.style[styleName] = value;
    if (isTransitioning){
      return this.transitionComplete(styleName);
    }
  }
}
