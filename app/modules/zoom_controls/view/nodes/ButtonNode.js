//imports ----------------------------------------------------------------------

import Emitter from '../../../../lib/Emitter.js';
import '../stylesheets/zoom_button_container.scss';


//exports ----------------------------------------------------------------------

export default function ButtonNode(className, buttonId){

  var emitter = new Emitter();

  //create dom element ---------------------------------------------------------

  var node = document.createElement('div');
  node.className = `zoom-button ${className}`;

  node.addEventListener('click', function(){
    emitter.broadcast('click', buttonId);
  });

  //public api -----------------------------------------------------------------

  return { node, emitter };

}
