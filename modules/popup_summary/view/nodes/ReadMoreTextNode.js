//imports ----------------------------------------------------------------------

import NewEmitter from '../../../../lib/Emitter.js';
import DomElement from '../../../../lib/DomElement.js';


//exports ----------------------------------------------------------------------

export default function ReadMoreTextNode(){

  //private code block ---------------------------------------------------------

  var emitter = NewEmitter();

  var clickEventHandler = function(){
    emitter.broadcast('click');
  }

  var node = document.createElement('span');
  node.className = 'read-more-text';
  node.innerHTML = 'Read more';
  node.addEventListener('click', clickEventHandler);

  //public api -----------------------------------------------------------------

  return {
    node,
    addListener: emitter.addListener,
  }

}
