export default function PopupViewInputController(view){

  var { nodes } = view;
  var { closeButton } = nodes;

  //public api -----------------------------------------------------------------

  this.enable = function(){
    closeButton.isListening = true;
  };

  this.disable = function(){
    closeButton.isListening = false;
  };

}
