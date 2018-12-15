//imports ----------------------------------------------------------------------

import NewEmitter from '../../../lib/Emitter.js';


//exports ----------------------------------------------------------------------

export default function NewContainerView(){

  //private code block ---------------------------------------------------------

  var emitter = NewEmitter();

  var clickEventHandler = function(evt){
    var graphicId = evt.target.dataset.id;
    emitter.broadcast('graphicClicked', graphicId);
  }

    /*if (evt.target.dataset.type == 'point'){
      pointSelectAction(evt.target.dataset.id, evt.target.dataset.worldX, evt.target.dataset.worldY);
    } else {
      clusterSelectAction(evt.target.dataset.worldX, evt.target.dataset.worldY);
    }*/

  var node = document.createElement('div');
  node.className = 'graphics-layer';
  node.addEventListener('click', clickEventHandler);

  //public api -----------------------------------------------------------------

  return {
    node,
    addListener: emitter.addListener,
  };
}
