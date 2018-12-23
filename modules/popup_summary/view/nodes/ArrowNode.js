//imports ----------------------------------------------------------------------

import DomElement from '../../../../lib/DomElement.js';


//exports ----------------------------------------------------------------------

export default function ArrowNode(){

  //create dom element ---------------------------------------------------------

  var arrow = new DomElement('div', 'arrow');

  //public api -----------------------------------------------------------------

  this.node = arrow.node;

  this.display = function(){
    arrow.display('block');
  };

  this.setNoDisplay = arrow.setNoDisplay;

}
