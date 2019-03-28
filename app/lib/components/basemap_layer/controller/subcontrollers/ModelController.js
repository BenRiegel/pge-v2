//imports ----------------------------------------------------------------------

import { valueToLevel } from '../../../../web_mapping/WebMapScale.js';


//exports ----------------------------------------------------------------------

export default function BasemapLayerModelController(model, webMapState, dispatcher){

  //define user event reactions ------------------------------------------------

  var updateProps = function(){
    var imageTileLevel = valueToLevel(webMapState.scale);
    imageTileLevel = Math.round(imageTileLevel);
    model.set('imageTileLevel', imageTileLevel);
    var numBasemapTiles = Math.pow(2, imageTileLevel);
    model.set('numBasemapTiles', numBasemapTiles);
  }

  //load reactions -------------------------------------------------------------

  dispatcher.setListener('model', 'zoomEnd', updateProps);

  //init -----------------------------------------------------------------------

  updateProps();

}
