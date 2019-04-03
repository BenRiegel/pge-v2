export default function GraphicsLayerViewInputController(view, dispatcher){

  var { nodes } = view;
  var { root } = nodes;

  //define reactions -----------------------------------------------------------

  var publicActionInProgress = false;

  var updateListeners = function(){
    root.isListening = !publicActionInProgress;
  }

  var onPublicActionUpdate = function(newValue){
    publicActionInProgress = newValue;
    updateListeners();
  }

  //load reactions -------------------------------------------------------------

  dispatcher.setListener('view', 'publicActionUpdate', onPublicActionUpdate);

}
