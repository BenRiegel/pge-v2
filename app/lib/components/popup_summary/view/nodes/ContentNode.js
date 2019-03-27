//imports ----------------------------------------------------------------------

import DomNodeTransitions from '../../../../utils/DomNodeTransitions.js';
import '../stylesheets/content.scss';


//exports ----------------------------------------------------------------------

export default class ContentNode extends DomNodeTransitions{
  constructor(){
    super('div', 'summary-content');
  }
  async transitionHeight(newValue, transitionDuration){
    this.setStyle('transition', `height ${transitionDuration}ms`);
    this.node.style.height = `${newValue}px`;
    await this.transitionComplete('height');
    this.setStyle('transition', '');
  }
}
