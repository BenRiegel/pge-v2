//imports ----------------------------------------------------------------------

import Emitter from '../../../utils/Emitter.js';


//exports ----------------------------------------------------------------------

export default function GraphicsLayerEmitter(){

  //public api -----------------------------------------------------------------

  return new Emitter( ['graphicsUpdateRequest',
                       'pointGraphicClicked',
                       'clusterGraphicClicked'] );

}
