//imports ----------------------------------------------------------------------

import NewEmitter from '../../../lib/Emitter.js';


//exports ----------------------------------------------------------------------

export default function NewContentView(){

  //private code block ---------------------------------------------------------

  var emitter = NewEmitter();

  var clickEventHandler = function(){
    emitter.broadcast('click');
  };

  var node = document.createElement('div');
  node.className = 'report-contract-button';
  node.addEventListener('click', clickEventHandler);

  //public api -----------------------------------------------------------------

  return {
    node,
    addListener: emitter.addListener,
  }

}
