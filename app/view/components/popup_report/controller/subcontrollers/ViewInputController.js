export default function PopupReportViewInputController(view){

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

}
