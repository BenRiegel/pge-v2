export default function SelectMenuOptionModelController(model, config){

  //public api -----------------------------------------------------------------

  this.updateIsSelected = function(selectedOptionKey){
    var isSelected = (selectedOptionKey === config.key);
    model.set('isSelected', isSelected);
  };

}
