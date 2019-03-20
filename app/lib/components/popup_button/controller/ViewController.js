export default function PopupButtonViewController(view, popupViewState){

  var { nodes } = view;
  var { root, icon } = nodes;

  //configure dom --------------------------------------------------------------

  root.appendChildNode(icon.node);

  //define reactions -----------------------------------------------------------

  var updateDomListener = function(){
    root.isListening = (!popupViewState.actionInProgress && !popupViewState.userDisabled);
  }

  //load reactions -------------------------------------------------------------

  popupViewState.addListener('userDisabled', updateDomListener);
  popupViewState.addListener('actionInProgress', updateDomListener);

  //init -----------------------------------------------------------------------

  updateDomListener();

}
