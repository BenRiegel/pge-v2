//imports ----------------------------------------------------------------------

import DomElement from '../../../../lib/DomElement.js';
import '../stylesheets/arrow.scss';


//exports ----------------------------------------------------------------------

export default function ArrowNode(summaryState){

  //create dom element ---------------------------------------------------------

  var arrow = new DomElement('div', 'arrow');

  //define state change reactions ----------------------------------------------

  var updateDisplay = function(){
    if (summaryState.isVisible && !summaryState.isExpanded){
      arrow.display('block');
    } else {
      arrow.setNoDisplay();
    }
  }

  //load reactions -------------------------------------------------------------

  summaryState.addListener('isVisible', 'arrow - display', updateDisplay);
  summaryState.addListener('isExpanded', 'arrow - display', updateDisplay);

  //init dom element -----------------------------------------------------------

  updateDisplay();

  //public api -----------------------------------------------------------------

  return arrow;

}
