//imports ----------------------------------------------------------------------

import DomNode from '../../../../lib/DomNode.js';
import '../stylesheets/animation_container.scss';


//module code block ------------------------------------------------------------

const FADE_OUT_DURATION = '0.75s';


//exports ----------------------------------------------------------------------

export default class AnimationContainerNode extends DomNode{
  constructor(){
    super('div', 'loader-animation-container');
  }
  async transitionToTransparent(duration){
    this.setStyle('transition', `opacity ${FADE_OUT_DURATION}`);
    await this.transitionSetStyle('opacity', '0');
    this.setStyle('transition', '');
  }
}
