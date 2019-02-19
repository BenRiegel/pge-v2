//imports ----------------------------------------------------------------------

import ComponentState from '../lib/ComponentState.js';
import mapViewpoint from './MapViewpoint.js';


//module code block ------------------------------------------------------------

var mapMovement = new ComponentState({
  type: null,
  baselineScale: undefined,
  zoomScaleFactor: undefined,
});

mapMovement.setType = function(type){
  this.set('type', type);
}

mapMovement.setOnChange('type', async function(currentValue, previousValue){
  this.requestUpdate('self', 'baselineScale');

  if (currentValue === null && previousValue === 'zoom'){
    this.requestUpdate('basemapLayer',  'copyTiles');
    this.requestUpdate('basemapLayer',  'reset');
    this.requestUpdate('graphicsLayer', 'updateGraphics');
    await this.requestUpdate('basemapTile', 'render');
    await this.requestUpdate('basemapLayer',  'revealNewTiles');

    /*emitter.broadcast('basemapTile - reset');
    await emitter.asyncBroadcast('basemapTile - render');
    emitter.broadcast('graphicsLayer - unhighlightCluster');
    emitter.broadcast('graphicsLayer - clusterGraphics');
    await emitter.asyncBroadcast('basemapLayer - revealNewTiles');*/

  }


});



var updateBaselineScale = function(){
  mapMovement.setQuick('baselineScale', mapViewpoint.scale);
  mapMovement.setQuick('zoomScaleFactor', 1);
}

var updateZoomScaleFactor = function(){
  var scaleFactor = mapMovement.baselineScale / mapViewpoint.scale;
  mapMovement.setQuick('zoomScaleFactor', scaleFactor);
}

mapMovement.addListener('type', 'self', 'baselineScale', () => {
  if (mapMovement.type !== 'pan'){
    updateBaselineScale();
  }
});

mapViewpoint.addListener('mapMovement', () => {
  var scaleHasChanged = mapViewpoint.propHasChanged('scale');
  if (scaleHasChanged){
    updateZoomScaleFactor();
  }
});

updateBaselineScale();
updateZoomScaleFactor();


//exports ----------------------------------------------------------------------

export default mapMovement;
