export default function SelectMenuModelController(model, dispatcher){

  //define event reactions -----------------------------------------------------

  var onLoadOptions = function( {selectedOptionKey} ){
    model.set('selectedOptionKey', selectedOptionKey);
  }

  var onOptionClick = function(selectedOptionKey){
    model.set('selectedOptionKey', selectedOptionKey);
    model.set('isOpen', !model.isOpen);
  }

  //load event reactions -------------------------------------------------------

  dispatcher.setListener('model', 'loadOptions', onLoadOptions);
  dispatcher.setListener('model', 'optionClick', onOptionClick);

}
