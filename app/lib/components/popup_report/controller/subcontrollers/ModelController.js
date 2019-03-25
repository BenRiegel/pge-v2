export default function PopupModelController(model, dispatcher){

  //define reactions -----------------------------------------------------------

  var onFadeInAndShow = function(content){
    model.set('content', content);
  }

  //load reactions -------------------------------------------------------------

  dispatcher.setListener('model', 'fadeInAndShow', onFadeInAndShow);

}
