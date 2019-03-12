//imports ----------------------------------------------------------------------

import DomNode from '../../../../utils/DomNode.js';
import '../stylesheets/root.scss';


//exports ----------------------------------------------------------------------

export default class RootNode extends DomNode{

  constructor(key){
    super('div', 'option');
    this.setDatasetProp('key', key);
  }

  setBorderRadius(value){
    if (value === 'rounded'){
      this.addClass('rounded-border-radius');
    } else if (value === 'default'){
      this.removeClass('rounded-border-radius');
    }
  }

  setHeight(value){
    if (value === 'expanded'){
      this.addClass('expanded');
    } else if (value === 'contracted'){
      this.removeClass('expanded');
    }
  }

  async transitionHeight(value){
    this.addClass('transition-height');
    if (value === 'expanded'){
      await this.transitionAddClass('expanded', ['height']);   //<---- args
    } else if (value === 'contracted'){
      await this.transitionRemoveClass('expanded', ['height']);
    }
    this.removeClass('transition-height');
  }

}
