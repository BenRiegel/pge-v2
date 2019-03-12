export default function PopupSummaryStateController(state, popupState){

  //define state change reactions ----------------------------------------------

  var updateContent = function(){
    return state.setAsync('content', popupState.content);
  }

  var updateIsActive = function(){
    return state.setAsync('isActive', popupState.isOpen && !popupState.isExpanded);
  }

  //load reactions -------------------------------------------------------------

  popupState.addListenerByType('isOpen', 'summaryContent', updateContent);
  popupState.addListenerByType('isOpen', 'summaryIsActive', updateIsActive);
  popupState.addListenerByType('isExpanded', 'summaryIsActive', updateIsActive);

  //init -----------------------------------------------------------------------

  updateIsActive();
  updateContent();

}
