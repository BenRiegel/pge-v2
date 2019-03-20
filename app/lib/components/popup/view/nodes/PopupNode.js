//imports ----------------------------------------------------------------------

import DomNode from '../../../../utils/DomNode.js';
import '../stylesheets/popup.scss';


//exports ----------------------------------------------------------------------

export default class PopupNode extends DomNode{
  constructor(){
    super('div', 'popup');
    this.contractedDimensions = undefined;
    this.expandedDimensions = undefined;
  }
  async transitionDimensions(height, width, left){
    this.addClass('transition-dimensions');
    var p1 = this.transitionSetStyle('height', height);
    var p2 = this.transitionSetStyle('width', width);
    var p3 = this.transitionSetStyle('left', left);
    await Promise.all([p1,p2,p3]);
    this.removeClass('transition-dimensions');
  }
  setZIndex(value){
    if (value === 'expanded'){
      this.addClass('expanded-z');
    } else if (value === 'contracted'){
      this.removeClass('expanded-z');
    }
  }
}
