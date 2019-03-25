export default function PopupModelController(model, dispatcher){

  //define reactions -----------------------------------------------------------

  var onNewContent = function(content){
    model.set('content', content);
  }

  //load reactions -------------------------------------------------------------

  dispatcher.setListener('model', 'newContent', onNewContent);

}
