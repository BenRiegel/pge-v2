//imports ----------------------------------------------------------------------

import { wait } from '../../../utils/Utils.js';


//exports ----------------------------------------------------------------------

export default function WebMapDispatcherController(dispatcher, view){

  var { subcomponents } = view;
  var { graphicsLayer } = subcomponents;

  //define user event reactions ------------------------------------------------

  var selectPointGraphic = async function(id, worldCoords, attributes){
    dispatcher.broadcast('selectPointGraphic', id);
    await dispatcher.asyncBroadcast('animateTo', 'panTo', worldCoords);
    await wait(100);
    await dispatcher.asyncBroadcast('openPopup', attributes);
  }

  var selectClusterGraphic = async function(id, worldCoords, attributes){
    dispatcher.broadcast('selectClusterGraphic', id);
    await dispatcher.asyncBroadcast('animateTo', 'zoomTo', worldCoords);
  }

  //load reactions -------------------------------------------------------------

  graphicsLayer.addEventListener('pointGraphicClicked', selectPointGraphic);
  graphicsLayer.addEventListener('clusterGraphicClicked', selectClusterGraphic);

}
