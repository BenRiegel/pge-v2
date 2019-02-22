//imports ----------------------------------------------------------------------

import DomElement from '../../../../lib/DomElement.js';
import '../stylesheets/loader_spinner.scss';


//exports ----------------------------------------------------------------------

export default function SpinnerNode(state){

  //create dom element ---------------------------------------------------------

  var spinner = new DomElement('div', 'spinner');

  //define state change reactions ----------------------------------------------

  var updateVisibility = function(){
    if (state.isVisible){
      spinner.setVisibility('visible');
    } else {
      spinner.setVisibility('hidden');
    }
  };

  //load reactions -------------------------------------------------------------

  state.addListener('isVisible', 'spinner - visibility', updateVisibility);

  //init dom element -----------------------------------------------------------

  updateVisibility();

  //public api -----------------------------------------------------------------

  return spinner;

}
