export default function PointGraphicStateController(state, props, layerState){

  //define state change reactions ----------------------------------------------

  var updateHasSelectedTag = function(){
    var hasSelectedTag = props.attributes.tags.includes(layerState.selectedTag);
    state.set('hasSelectedTag', hasSelectedTag);
  }

  var updateIsSelected = function(graphicInfo){
    var typeMatch = (graphicInfo.type === 'point');
    var idMatch = (graphicInfo.id === props.id);
    var isSelected = (typeMatch && idMatch);
    state.set('isSelected', isSelected);
  }

  //load reactions -------------------------------------------------------------

  layerState.addListener('selectedGraphic', updateIsSelected);
  layerState.addListenerByType('selectedTag', 'pointGraphic', updateHasSelectedTag);

  //init -----------------------------------------------------------------------

  updateHasSelectedTag();

}
