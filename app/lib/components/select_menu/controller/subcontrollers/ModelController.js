export default function SelectMenuModelController(model){

  //public api -----------------------------------------------------------------

  this.addOption = function(optionKey){
    var optionKeys = model.optionKeys || [];
    optionKeys.push(optionKey);
    model.set('optionKeys', optionKeys);
  };

  this.updateSelectedOptionKey = function(optionKey){
    if (model.optionKeys.includes(optionKey)){
      model.set('selectedOptionKey', optionKey);
    }
  };

  this.toggleIsOpen = function(){
    model.set('isOpen', !model.isOpen);
  };

  this.setClosed = function(){
    model.set('isOpen', false);
  };

}
