export default function SelectMenuModel(){

  //public api -----------------------------------------------------------------

  this.isOpen = false;

  this.selectedOptionKey = null;

  this.newSelectedOption = false;

  this.newOpenState = false;

  this.selectOption = function(newKey){
    this.newSelectedOption = false;
    if (this.selectedOptionKey !== newKey){
      this.selectedOptionKey = newKey;
      this.newSelectedOption = true;
    }
  };

  this.toggleOpenState = function(){
    this.isOpen = !this.isOpen;
    this.newOpenState = true;
  }

}
