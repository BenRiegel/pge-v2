//imports ----------------------------------------------------------------------

import DomElement from '../../../../lib/DomElement.js';
import '../stylesheets/popup_report_content.scss';


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

  //init dom element -----------------------------------------------------------

  updateOpacity();

  //public api -----------------------------------------------------------------

  return contentContainer;

}
