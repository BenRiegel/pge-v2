export default function SelectMenuOptionModel(){

  //public api -----------------------------------------------------------------

  this.isSelected = false;

  this.newIsSelectedValue = false;

  this.updateIsSelected = function(newValue){
    this.newIsSelectedValue = false;
    if (newValue !== this.isSelected){
      this.isSelected = newValue;
      this.newIsSelectedValue = true;
    }
  }

}
