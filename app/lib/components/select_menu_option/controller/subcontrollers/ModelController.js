export default function SelectMenuOptionModelController(model, props){

  //public api -----------------------------------------------------------------

  this.updateIsSelected = function(selectedOptionKey){
    var isSelected = (selectedOptionKey === props.key);
    model.set('isSelected', isSelected);
  };

}
