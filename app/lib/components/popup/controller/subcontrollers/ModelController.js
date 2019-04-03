export default function PopupModelController(model, dispatcher){

  //define event reactions -----------------------------------------------------

  var onSetContent = function(content){
    model.set('content', content);
  }

  //load event reactions -------------------------------------------------------

  dispatcher.setListener('model', 'setContent', onSetContent);

}
