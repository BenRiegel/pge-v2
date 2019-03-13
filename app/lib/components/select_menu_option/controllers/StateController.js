export default function SelectMenuOptionStateController(optionState, optionKey, menuState){

  //define state change reactions ----------------------------------------------

  var updateIsSelected = function(){
    optionState.set('isSelected', optionKey === menuState.selectedOptionKey);
  }

  //load reactions -------------------------------------------------------------

  menuState.addListener('selectedOptionKey', updateIsSelected);

  //init -----------------------------------------------------------------------

  updateIsSelected();

}