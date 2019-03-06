//imports ----------------------------------------------------------------------

import DomNode from '../../../../lib/DomNode.js';
import '../stylesheets/report_content.scss';


//module code block ------------------------------------------------------------

const TRANSITION_DURATION = '0.75s';


//exports ----------------------------------------------------------------------

export default class ReportContentNode extends DomNode{
  constructor(){
    super('div', 'report-content');
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
