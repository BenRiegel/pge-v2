export default function SelectMenuModelController(model){

  //public api -----------------------------------------------------------------

  this.addOptionKey = function(optionKey){
    model.optionKeys.push(optionKey);
  };

  this.setSelectedOptionKey = function(selectedOptionKey){
    var validOptionKey = model.optionKeys.includes(selectedOptionKey);
    if (validOptionKey){
      model.set('selectedOptionKey', selectedOptionKey);
    }
  };

}
