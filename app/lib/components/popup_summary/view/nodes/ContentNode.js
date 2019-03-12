//imports ----------------------------------------------------------------------

import DomNode from '../../../../utils/DomNode.js';
import '../stylesheets/content.scss';


//exports ----------------------------------------------------------------------

export default class ContentNode extends DomNode{
  constructor(){
    super('div', 'summary-content');
  }
  async transitionHeight(newValue, transitionDuration){
    this.setStyle('transition', `height ${transitionDuration}ms`);
    await this.transitionSetStyle('height', `${newValue}px`);
    this.setStyle('transition', '');
  }
}
