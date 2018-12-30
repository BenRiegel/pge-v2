//imports ----------------------------------------------------------------------

import DomElement from '../../../../lib/DomElement.js';


//exports ----------------------------------------------------------------------

export default function ContainerNode(reportState){

  //create dom element ---------------------------------------------------------

  var container = new DomElement('div', 'report-window');

  //define state change reactions ----------------------------------------------

  var updateVisibility = function(){
    if (reportState.isVisible){
      container.setVisibility('visible');
    } else {
      container.setVisibility('hidden');
    }
  }

  //load reactions -------------------------------------------------------------

  reportState.addListener('isVisible', 'container', 'visibility', updateVisibility);

  //public api -----------------------------------------------------------------

  this.node = container.node;

  this.render = function(){
    updateVisibility();
  }

}
