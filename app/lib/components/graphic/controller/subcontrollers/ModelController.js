export default function GraphicModelController(model, props, dispatcher, layerModel){

  //define event reactions -----------------------------------------------------

  var onUpdateIsSelected = function(){
    model.set('isSelected', props.id === layerModel.selectedGraphicId);
  }

  //load event reactions -------------------------------------------------------

  dispatcher.setListener('model', 'updateIsSelected', onUpdateIsSelected);

  //init -----------------------------------------------------------------------

  onUpdateIsSelected();

}
