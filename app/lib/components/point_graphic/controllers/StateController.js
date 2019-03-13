export default function PointGraphicStateController(state, props, layerState, webMapState){

  var { selectedGraphic } = webMapState;

  //define state change reactions ----------------------------------------------

  var updateHasSelectedTag = function(){
    var hasSelectedTag = props.attributes.tags.includes(layerState.selectedTag);
    state.set('hasSelectedTag', hasSelectedTag);
  }

  var updateIsSelected = function(){
    var typeMatch = (selectedGraphic.type === 'point');
    var idMatch = (selectedGraphic.id === props.id);
    var isSelected = (typeMatch && idMatch);
    state.set('isSelected', isSelected);
  }

  //load reactions -------------------------------------------------------------

  selectedGraphic.addListener('updateGraphics', updateIsSelected);
  layerState.addListenerByType('selectedTag', 'pointGraphic', updateHasSelectedTag);

  //init -----------------------------------------------------------------------

  updateHasSelectedTag();
  updateIsSelected();

}
