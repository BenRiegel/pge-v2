export default function SelectMenuOptionModelController(model, config, dispatcher, menuModel){

  //define event reactions -----------------------------------------------------

  var onNewSelectedOption = function(){
    var isSelected = (menuModel.selectedOptionKey === config.key);
    model.updateIsSelected(isSelected);
  }

  //load reactions -------------------------------------------------------------

  dispatcher.setListener('model', 'newSelectedOption', onNewSelectedOption);

  //init -----------------------------------------------------------------------

  onNewSelectedOption();
}
