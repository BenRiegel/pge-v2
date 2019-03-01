export default function StateController(props, mapViewpoint, layerState, state){

  //define state change reactions ----------------------------------------------

  var updateMapCoords = function(){
    var mapCoords = {
      x: props.worldCoords.x / mapViewpoint.scale,
      y: props.worldCoords.y / mapViewpoint.scale,
    }
    state.set('mapCoords', mapCoords);
  }

  //load reactions -------------------------------------------------------------

  layerState.addListener('zoomScaleFactor', updateMapCoords);

  //init -----------------------------------------------------------------------

  updateMapCoords();

}
