//imports ----------------------------------------------------------------------

import DomElement from '../../../../lib/DomElement.js';
import { transitionSetStyle } from '../../../../lib/ViewUtils.js';


//exports ----------------------------------------------------------------------

export default function ContentContainerNode(summaryState){

  //create dom element ---------------------------------------------------------

  var contentContainer = new DomElement('div', 'summary-content');

  //define state change reactions ----------------------------------------------

  var updateHeight = async function(){
    if (summaryState.isVisible){
      var offsetHeight = contentContainer.getNodeProp('clientHeight');
      var scrollHeight = contentContainer.getNodeProp('scrollHeight');
      var deltaHeight = scrollHeight - offsetHeight;
      var transitionTime = Math.abs(3 * deltaHeight);
      contentContainer.setStyle('transition', `height ${transitionTime}ms`);
      await contentContainer.transitionSetStyle('height', `${offsetHeight}px`, `${scrollHeight}px`);
      contentContainer.setStyle('transition', '');
    } else {
      contentContainer.setStyle('height', '');
    }
  }

  var updateOpacity = async function(){
    if (summaryState.isVisible){
      if (summaryState.isExpanded){
        await contentContainer.animateOpacity('transparent');
      } else {
        await contentContainer.animateOpacity('opaque');
      }
    } else {
      contentContainer.setOpacity('transparent');
    }
  }

  //load reactions -------------------------------------------------------------

  summaryState.addListener('isVisible', 'contentContainer', 'opacity', updateOpacity);
  summaryState.addListener('isExpanded', 'contentContainer', 'opacity', updateOpacity);
  summaryState.addListener('isVisible', 'contentContainer', 'height', updateHeight);

  //public api -----------------------------------------------------------------

  this.node = contentContainer.node;

  this.render = function(){
    updateOpacity();
    updateHeight();
  }

}
