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
    this.isTransitioning = isTransitioning;
    if (newValue === 'expanded'){
      this.removeClass('contracted');
      this.addClass('expanded');
    } else if (newValue === 'contracted'){
      this.removeClass('expanded');
      this.addClass('contracted');
    }
    if (isTransitioning){
      return this.transitionComplete('height');
    }
  }

}
