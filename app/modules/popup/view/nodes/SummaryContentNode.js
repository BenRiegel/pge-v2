//imports ----------------------------------------------------------------------

import DomNode from '../../../../lib/DomNode.js';
import '../stylesheets/summary_content.scss';


//module code block ------------------------------------------------------------

const TRANSITION_DURATION = '0.75s';


//exports ----------------------------------------------------------------------

export default class SummaryContentNode extends DomNode{
  constructor(){
    super('div', 'summary-content');
  }
  async transitionToOpaque(){
    this.setStyle('transition', `opacity ${TRANSITION_DURATION}`);
    await this.transitionSetStyle('opacity', '1');
    this.setStyle('transition', '');
  }
  async transitionToTransparent(){
    this.setStyle('transition', `opacity ${TRANSITION_DURATION}`);
    await this.transitionSetStyle('opacity', '0');
    this.setStyle('transition', '');
  }
}
