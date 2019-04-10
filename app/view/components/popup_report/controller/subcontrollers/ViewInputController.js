export default function PopupReportViewInputController(view){

  var { nodes } = view;
  var { closeButton, contractButton } = nodes;

  //public api -----------------------------------------------------------------

  this.onEnable = function(){
    closeButton.isListening = true;
    contractButton.isListening = true;
  };

  this.onDisable = function(){
    closeButton.isListening = false;
    contractButton.isListening = false;
  };

}
