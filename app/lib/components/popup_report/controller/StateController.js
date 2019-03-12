export default function PopupReportStateController(state, popupState){

  //define state change reactions ----------------------------------------------

  var updateContent = function(){
    return state.setAsync('content', popupState.content);
  }

  var updateIsActive = function(){
    return state.setAsync('isActive', popupState.isExpanded);
  }

  //load reactions -------------------------------------------------------------

  popupState.addListenerByType('isExpanded', 'reportContent', updateContent);
  popupState.addListenerByType('isExpanded', 'reportIsActive', updateIsActive);

  //init -----------------------------------------------------------------------

  updateIsActive();
  updateContent();

}
