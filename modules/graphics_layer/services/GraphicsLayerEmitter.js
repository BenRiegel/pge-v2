//imports ----------------------------------------------------------------------

import NewEmitter from '../../../lib/Emitter.js';


//exports ----------------------------------------------------------------------

export default function GraphicsLayerEmitter(){

  //creat emitter --------------------------------------------------------------

  var emitter = NewEmitter();

  emitter.onGraphicClick = function(id, type, worldCoords){
    if (type === 'point'){
      emitter.broadcast('pointSelected', id, worldCoords);
    } else {
      emitter.broadcast('clusterSelected', id, worldCoords);
    }
  }

  //public api -----------------------------------------------------------------

  return emitter;

}
