export default function SelectMenuModelController(model, dispatcher){

  var onLoadOptions = function( {selectedOptionKey} ){
    model.selectOption(selectedOptionKey);
  }

  var onOptionClick = function(selectedOptionKey){
    model.selectOption(selectedOptionKey);
    model.toggleOpenState();
  }

  //load reactions -------------------------------------------------------------

  dispatcher.setListener('model', 'loadOptions', onLoadOptions);
  dispatcher.setListener('model', 'optionClick', onOptionClick);

}
