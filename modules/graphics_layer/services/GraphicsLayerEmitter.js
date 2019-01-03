//imports ----------------------------------------------------------------------

import NewEmitter from '../../../lib/Emitter.js';


//exports ----------------------------------------------------------------------

export default function GraphicsLayerEmitter(state){

  //creat emitter --------------------------------------------------------------

  var emitter = NewEmitter();

  emitter.onGraphicClick = function(id){
    var graphic = state.graphicsList[id];
    if (graphic.type === 'point'){
      emitter.broadcast('pointSelected', id, graphic.worldCoords);
    } else {
      emitter.broadcast('clusterSelected', graphic.worldCoords);
    }
  }

  //public api -----------------------------------------------------------------

  return emitter;

}
