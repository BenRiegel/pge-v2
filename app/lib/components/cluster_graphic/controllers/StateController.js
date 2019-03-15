export default function ClusterGraphicStateController(state, props, layerState){

  //define state change reactions ----------------------------------------------

  var updateIsSelected = function(graphicInfo){
    var typeMatch = (graphicInfo.type === 'point');
    var idMatch = (graphicInfo.id === props.id);
    var isSelected = (typeMatch && idMatch);
    state.set('isSelected', isSelected);
  }

  //load reactions -------------------------------------------------------------

  layerState.addListener('selectedGraphic', updateIsSelected);

  //public api -----------------------------------------------------------------

  this.removeListener = function(){
    layerState.removeListener('selectedGraphic', updateIsSelected);
  }

}
