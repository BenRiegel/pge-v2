//imports ----------------------------------------------------------------------

import { getParentNodeProperty } from '../../../lib/ViewUtils.js';
import NewEmitter from '../../../lib/Emitter.js';


//exports ----------------------------------------------------------------------

export default function NewContainerView(){

  //private code block ---------------------------------------------------------

  var emitter = NewEmitter();

  var clickEventHandler = function(evt){
    var optionClicked = getParentNodeProperty(evt.target, 'option', 'key');
    emitter.broadcast('menuClicked', optionClicked);
  }

  var node = document.createElement('div');
  node.className = 'select-menu-container';
  node.addEventListener('click', clickEventHandler);

  //public api -----------------------------------------------------------------

  return {
    node,
    addListener: emitter.addListener,
    setRoundedBorder: function(){
      node.classList.add('rounded');
    },
    setDefaultBorder: function(){
      node.classList.remove('rounded');
    },
  };
}
