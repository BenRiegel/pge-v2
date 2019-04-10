//imports ----------------------------------------------------------------------

import DomNodeTransitions from '../../../../utils/DomNodeTransitions.js';
import '../stylesheets/root.scss';


//exports ----------------------------------------------------------------------

export default class RootNode extends DomNodeTransitions{

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

  setHeight(newValue, isTransitioning){
    if (newValue === 'expanded'){
      this.removeClass('contracted');
      this.addClass('expanded');
    } else if (newValue === 'contracted'){
      this.removeClass('expanded');
      this.addClass('contracted');
    }
  }

  async transitionHeight(newValue){
    this.addClass('transition-height');
    this.loadTransitionListener('height');
    if (newValue === 'expanded'){
      this.removeClass('contracted');
      this.addClass('expanded');
    } else if (newValue === 'contracted'){
      this.removeClass('expanded');
      this.addClass('contracted');
    }
    await this.transitionComplete('height');
    this.removeClass('transition-height');
  }

}
