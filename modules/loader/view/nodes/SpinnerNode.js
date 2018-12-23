//imports ----------------------------------------------------------------------

import DomElement from '../../../../lib/DomElement.js';


//exports ----------------------------------------------------------------------

export default function SpinnerNode(state){

  //create dom element ---------------------------------------------------------

  var spinner = new DomElement('div', 'spinner');

  //define state change reactions ----------------------------------------------

  var updateVisibility = function(){
    if (state.isVisible){
      spinner.show();
    } else {
      spinner.hide();
    }
  };

  //load reactions -------------------------------------------------------------

  state.addListener('isVisible', 'spinner', 'visibility', updateVisibility);

  //public api -----------------------------------------------------------------

  this.node = spinner.node;

  this.render = function(){
    updateVisibility();
  };

}
