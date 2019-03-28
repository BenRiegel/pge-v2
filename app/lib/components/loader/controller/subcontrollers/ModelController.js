export default function LoaderModelController(model, dispatcher){

  //define event reactions -----------------------------------------------------

  var onUpdateIsActive = function(isActive){
    model.set('isActive', isActive);
  }
  
  //load event reactions -------------------------------------------------------

  dispatcher.setListener('model', 'updateIsActive', onUpdateIsActive);

}
