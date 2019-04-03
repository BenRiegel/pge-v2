export default function PopupSummaryViewInputController(view, dispatcher){

  var { nodes } = view;
  var { closeButton, readMore } = nodes;

  //define reactions -----------------------------------------------------------

  var onEnable = function(){
    closeButton.isListening = true;
    readMore.isListening = true;
  }

  var onDisable = function(){
    closeButton.isListening = false;
    readMore.isListening = false;
  }

  //load reactions -------------------------------------------------------------

  dispatcher.setListener('viewInput', 'enable', onEnable);
  dispatcher.setListener('viewInput', 'disable', onDisable);

}
