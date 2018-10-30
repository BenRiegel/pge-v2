//imports ----------------------------------------------------------------------

import NodeInstance from '../lib/NodeInstance.js';
import { getParentNodeProperty } from '../lib/ViewUtils.js';
import '../../stylesheets/zoom_controls.scss';


//exports ----------------------------------------------------------------------

export default function NewZoomControls(zoomAction){

  //view -----------------------------------------------------------------------

  var clickEventHandler = function(evt){
    var zoomType = getParentNodeProperty(evt.target, 'zoom-button', 'zoomType');
    if (zoomType !== null){
      zoomAction(zoomType);
    }
  }

  var container = new NodeInstance('div');
  container.className = 'zoom-controls-container';
  container.innerHTML = `<div class='zoom-button-container'>
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

  //public api -----------------------------------------------------------------

  return {
    rootNode: container.rootNode,
    enable(){
      container.onClick = clickEventHandler;
    },
    disable(){
      container.onClick = null;
    },
  }

}
