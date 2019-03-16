export default function PointGraphicStateController(state, props, layerState){

  //define state change reactions ----------------------------------------------

  var updateHasSelectedTag = function(){
    var hasSelectedTag = props.attributes.tags.includes(layerState.selectedTag);
    state.set('hasSelectedTag', hasSelectedTag);
  }

  var updateIsSelected = function(graphicId){
    state.set('isSelected', graphicId === props.id);
  }

  //load reactions -------------------------------------------------------------

  layerState.addListener('selectedGraphic', updateIsSelected);
  layerState.addListenerByType('selectedTag', 'pointGraphic', updateHasSelectedTag);

  //init -----------------------------------------------------------------------

  updateHasSelectedTag();

}
