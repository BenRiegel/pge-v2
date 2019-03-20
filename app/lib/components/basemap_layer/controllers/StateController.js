//imports ----------------------------------------------------------------------

import { valueToLevel } from '../../../web_mapping/WebMapScale.js';


//exports ----------------------------------------------------------------------

export default function BasemapLayerStateController(state, webMapState){

  //define user event reactions ------------------------------------------------

  var updateProps = function(){
    var imageTileLevel = valueToLevel(webMapState.scale);
    imageTileLevel = Math.round(imageTileLevel);
    state.set('imageTileLevel', imageTileLevel);
    var numBasemapTiles = Math.pow(2, imageTileLevel);
    state.set('numBasemapTiles', numBasemapTiles);
  }

  //init -----------------------------------------------------------------------

  updateProps();

  //public api -----------------------------------------------------------------

  this.updateProps = updateProps;
}
