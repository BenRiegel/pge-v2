//imports ----------------------------------------------------------------------

import DomElement from '../../../../lib/DomElement.js';
import '../stylesheets/popup_report_fade_container.scss';


//exports ----------------------------------------------------------------------

export default function FadeContainerNode(popupState, reportState){

  //create dom element ---------------------------------------------------------

  var fadeContainer = new DomElement('div', 'report-fade-container');

  //define state change reactions ----------------------------------------------

  var updateOpacity = async function(){
    if (reportState.isVisible){
      if (reportState.contentIsLoaded){
        await fadeContainer.animateOpacity('opaque');
      } else {
        fadeContainer.setOpacity('opaque');
      }
    } else {
      if (popupState.isOpen){
        await fadeContainer.animateOpacity('transparent');
      } else {
        fadeContainer.setOpacity('transparent');
      }
    }
  }

  //load reactions -------------------------------------------------------------

  reportState.addListener('isVisible', 'fadeContainer - opacity', updateOpacity);

  //init dom element -----------------------------------------------------------

  updateOpacity();

  //public api -----------------------------------------------------------------

  return fadeContainer;

}
