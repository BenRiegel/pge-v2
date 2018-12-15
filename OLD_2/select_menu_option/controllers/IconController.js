export default function NewIconController(state, icon){

  //private code block ---------------------------------------------------------


  /*state.isSelected.addListener('icon', currentValue => {
    updateIconVisibility(currentValue);
  });*/

  //public api -----------------------------------------------------------------

  return {
    updateChar: function(isOpen){
      if (isOpen){
        icon.char = 'check';
      } else {
        icon.char = 'arrow';
      }
    },
    updateVisibility: function(isSelected){
      if (isSelected){
        icon.isVisible = true;
      } else {
        icon.isVisible = false;
      }
    },
  }
}
