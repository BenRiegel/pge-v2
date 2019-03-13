export default function ClusterGraphicStateController(state, props, webMapState){

  var { selectedGraphic } = webMapState;

  //define state change reactions ----------------------------------------------

  var updateIsSelected = function(){
    var typeMatch = (selectedGraphic.type === 'cluster');
    var idMatch = (selectedGraphic.id === props.id);
    var isSelected = (typeMatch && idMatch);
    state.set('isSelected', isSelected);
  }

  //load reactions -------------------------------------------------------------

  selectedGraphic.addListener('updateGraphics', updateIsSelected);

  //public api -----------------------------------------------------------------

  this.removeListener = function(){
    selectedGraphic.removeListener('updateGraphics', updateIsSelected);
  }

}
