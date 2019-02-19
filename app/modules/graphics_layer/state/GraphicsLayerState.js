//imports ----------------------------------------------------------------------

import ComponentState from '../../../lib/ComponentState.js';


//exports ----------------------------------------------------------------------

export default function GraphicsLayerState(mapViewpoint, mapMovement, createGraphics){

  //create state var -----------------------------------------------------------

  var state = new ComponentState({
    isEnabled: true,
    selectedTag: null,
    highlightedGraphicId: null,
    graphics: [],
  });

  //modify behavior of locations prop ------------------------------------------

  state.setOnChange('selectedTag', async function(){
    this.requestUpdate('self', 'updateGraphics');
  });

  state.setOnChange('highlightedGraphicId', function(){
    this.requestUpdate('self', 'updateIsHighlighted');
  });

  //define state change reactions ----------------------------------------------

  var updateGraphics = async function(){
    var graphics = await createGraphics(state.selectedTag, mapViewpoint, mapMovement);
    state.set('graphics', graphics);
  }

  var updateRenderedDiameter = function(){
    for (var graphic of state.graphics){
      graphic.updateRenderedDiameter(mapMovement.zoomScaleFactor);
    }
  }

  var updateMapCoords = function(){
    for (var graphic of state.graphics){
      graphic.updateMapCoords();
    }
  }

  var updateScreenCoords = function(){
    for (var graphic of state.graphics){
      graphic.updateScreenCoords();
    }
  }

  var updateIsHighlighted = function(){
    for (var graphic of state.graphics){
      graphic.updateIsHighlighted(state.highlightedGraphicId);
    }
  }

  //load state change reactions ------------------------------------------------

  state.addListener('selectedTag', 'self', 'updateGraphics', async () => {
    await updateGraphics();
  });

  state.addListener('highlightedGraphicId', 'self', 'updateIsHighlighted', updateIsHighlighted);

  mapMovement.addListener('type', 'graphicsLayer', 'updateGraphics', async () => {
    await updateGraphics();
  });

  mapViewpoint.addListener('graphicsLayer', () => {
    var scaleHasChanged = mapViewpoint.propHasChanged('scale');
    if (scaleHasChanged){
      updateMapCoords();
      updateRenderedDiameter();
    }
    updateScreenCoords();
  });

  //public api -----------------------------------------------------------------

  return state;

}


//don't like this here
//var unhighlightCluster = function(){
//  state.set('highlightedGraphicId', null);
//}
