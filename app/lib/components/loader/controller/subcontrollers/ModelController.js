export default function LoaderModelController(model, dispatcher){

  //define event reactions -----------------------------------------------------

  var onActivate = function(){
    model.set('isActive', true);
  }

  var onTerminate = function(){
    model.set('isActive', false);
  }

  //load event reactions -------------------------------------------------------

  dispatcher.setListener('model', 'activate', onActivate);
  dispatcher.setListener('model', 'terminate', onTerminate);

}
