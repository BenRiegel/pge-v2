//imports ----------------------------------------------------------------------

import DomElement from '../../../../lib/DomElement.js';


//exports ----------------------------------------------------------------------

export default function ContentContainerNode(popupState, reportState){

  //create dom element ---------------------------------------------------------

  var contentContainer = new DomElement('div', 'report-content');

  //define state change reactions ----------------------------------------------

  var updateOpacity = async function(){
    if (reportState.isVisible){
      await contentContainer.animateOpacity('opaque');
    } else {
      if (popupState.isOpen){
        await contentContainer.animateOpacity('transparent');
      } else {
        contentContainer.setOpacity('transparent');
      }
    }
  }

  //load reactions -------------------------------------------------------------

  reportState.addListener('isVisible', 'contentContainer', 'opacity', updateOpacity);

  //public api -----------------------------------------------------------------

  this.node = contentContainer.node;

  this.render = function(){
    updateOpacity();
  }

}
