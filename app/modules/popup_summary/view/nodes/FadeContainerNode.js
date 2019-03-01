//imports ----------------------------------------------------------------------

import DomElement from '../../../../lib/DomElement.js';
import '../stylesheets/fade_container.scss';


//exports ----------------------------------------------------------------------

export default function FadeContainerNode(popupState, summaryState){

  //create dom element ---------------------------------------------------------

  var fadeContainer = new DomElement('div', 'summary-fade-container');

  //define state change reactions ----------------------------------------------

  var updateOpacity = async function(){
    if (popupState.isExpanded){
      await fadeContainer.animateOpacity('transparent');
  //      await fadeContainer.animateOpacity('opaque');
    //  } else {
      //  fadeContainer.setOpacity('opaque');
      //}
    } else {
        //    await fadeContainer.animateOpacity('opaque');
      if (popupState.isOpen){
        await fadeContainer.animateOpacity('opaque');
      } else {
        fadeContainer.setOpacity('opaque');
      }
    }
  }

  //load reactions -------------------------------------------------------------

  summaryState.addListener('isExpanded', 'fadeContainer - opacity', updateOpacity);

  //init dom element -----------------------------------------------------------

  updateOpacity();

  //public api -----------------------------------------------------------------

  return fadeContainer;

}
