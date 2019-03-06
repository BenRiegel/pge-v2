//imports ----------------------------------------------------------------------

import DomNode from '../../../../lib/DomNode.js';
import '../stylesheets/option_container.scss';


//module code block ------------------------------------------------------------

const OPTION_EXPANDED_HEIGHT = '25px';
const TRANSITION_DURATION = '0.5s';


//exports ----------------------------------------------------------------------

export default class ContainerNode extends DomNode{
  constructor(key){
    super('div', 'option');
    this.setDatasetProp('key', key);
    this.setStyle('line-height', OPTION_EXPANDED_HEIGHT);
  }
  setRoundedBorderRadius(){
    this.addClass('rounded-border-radius');
  }
  setDefaultBorderRadius(){
    this.removeClass('rounded-border-radius');
  }
  setExpanded(){
    this.setStyle('height', OPTION_EXPANDED_HEIGHT);
  }
  setContracted(){
    this.setStyle('height', '0');
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
  async transitionToExpanded(){
    this.setStyle('transition', `height ${TRANSITION_DURATION}`);
    await this.transitionSetStyle('height', OPTION_EXPANDED_HEIGHT);
    this.setStyle('transition', '');
  }
  async transitionToContracted(){
    this.setStyle('transition', `height ${TRANSITION_DURATION}`);
    await this.transitionSetStyle('height', '0');
    this.setStyle('transition', '');
  }
}
