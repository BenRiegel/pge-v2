//imports ----------------------------------------------------------------------

import { getParentNodeProperty } from '../../../lib/ViewUtils.js';
import NewEmitter from '../../../lib/Emitter.js';


//exports ----------------------------------------------------------------------

export default function NewContainerView(){

  //private code block ---------------------------------------------------------

  var emitter = NewEmitter();

  var clickEventHandler = function(evt){
    var zoomType = getParentNodeProperty(evt.target, 'zoom-button', 'zoomType');
    if (zoomType !== null){
      emitter.broadcast('buttonClicked', zoomType);
    }
  };

  var node = document.createElement('div');
  node.className = 'zoom-controls-container';
  node.innerHTML = `<div class='zoom-button-container'>
                           <div class='zoom-button' data-zoom-type='home'>
                             <span class='fa fa-home'></span>
                           </div>
                         </div>
                         <div class='zoom-button-container'>
                           <div class='zoom-button' data-zoom-type='in'>
                             <span class='fa fa-plus'></span>
                           </div>
                           <div class='zoom-button' data-zoom-type='out'>
                             <span class='fa fa-minus'></span>
                           </div>
                         </div>`;
  node.addEventListener('click', clickEventHandler);

  //public api -----------------------------------------------------------------

  return {
    node,
    addListener: emitter.addListener,
  }

}
