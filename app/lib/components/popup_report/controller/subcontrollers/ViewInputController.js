export default function PopupReportViewInputController(view, dispatcher){

  var { nodes } = view;
  var { closeButton, contractButton } = nodes;

  //define reactions -----------------------------------------------------------

  var onEnable = function(){
    closeButton.isListening = true;
    contractButton.isListening = true;
  }

  var onDisable = function(){
    closeButton.isListening = false;
    contractButton.isListening = false;
  }

  //load reactions -------------------------------------------------------------

  dispatcher.setListener('viewInput', 'enable', onEnable);
  dispatcher.setListener('viewInput', 'disable', onDisable);

}
