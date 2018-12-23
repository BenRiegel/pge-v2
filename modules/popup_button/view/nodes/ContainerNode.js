//imports ----------------------------------------------------------------------

import DomElement from '../../../../lib/DomElement.js';


//exports ----------------------------------------------------------------------

export default function ContainerNode(className, eventsEmitter){

  //create dom element ---------------------------------------------------------

  var container = new DomElement('div', className);

  //define event handlers ------------------------------------------------------

  var clickEventHandler = function(){
    eventsEmitter.broadcast('click');
  };

  container.node.addEventListener('click', clickEventHandler);

  //public api -----------------------------------------------------------------

  this.node = container.node;

}
