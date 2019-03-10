export default function GraphicsLayerStateController(state, mapViewpoint){

  //define state change reactions ----------------------------------------------

  var updateBaselineScale = function(){
    state.set('baselineScale', mapViewpoint.scale);
  }

  //load state change reactions ------------------------------------------------



/*  mapViewpoint.addListener('zoomEnd - graphicsLayerReset', () => {
    updateBaselineScale();
    updateZoomScaleFactor();
    loadNewGraphics();
    state.set('highlightedGraphicId', null);   //don't like this
  });*/

  //mapViewpoint.addListener('zoomAction', () => {
    //updatePixelNum();
    //updateZoomScaleFactor();
    //updateViewpointCenterMap();
  //});

//  mapViewpoint.addListener('panAction', () => {
//    updateViewpointCenterMap();
//  });

  mapViewpoint.addListener('zoomHomeAction', () => {
    loadNewGraphics();
    updateBaselineScale();
  //  updatePixelNum();
//    updateZoomScaleFactor();
    updateViewpointCenterMap();
  });

  //init -----------------------------------------------------------------------

  updateBaselineScale();


}
