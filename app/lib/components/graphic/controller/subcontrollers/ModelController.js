export default function GraphicModelController(model, props){

  //public api -----------------------------------------------------------------

  this.updateIsSelected = function(selectedGraphicId){
    model.set('isSelected', props.id === selectedGraphicId);
  };

}
