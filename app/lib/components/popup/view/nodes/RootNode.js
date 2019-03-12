//imports ----------------------------------------------------------------------

import DomNode from '../../../../utils/DomNode.js';
import '../stylesheets/root.scss';


//exports ----------------------------------------------------------------------

export default class RootNode extends DomNode{

  constructor(){
    super('div', 'popup');
  }

  setDimensions(value){
    if (value === 'expanded'){
      this.addClass('expanded');
    } else if (value === 'contracted'){
      this.removeClass('expanded');
    }
  }

  async transitionDimensions(value){
    this.addClass('transition-dimensions');
    if (value === 'expanded'){
      await this.transitionAddClass('expanded', ['width', 'height', 'left']);
    } else if (value === 'contracted'){
      await this.transitionRemoveClass('expanded', ['width', 'height', 'left']);
    }
    this.removeClass('transition-dimensions');
  }

  setHeight(value){
    if (value === 'offset'){
      var height = this.getProp('offsetHeight');
      this.setStyle('height', `${height}px`);
    } else if (value === 'auto'){
      this.setStyle('height', '');
    }
  }

  setZIndex(value){
    if (value === 'expanded'){
      this.addClass('expanded-z');
    } else if (value === 'contracted'){
      this.removeClass('expanded-z');
    }
  }

}
