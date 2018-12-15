export default function NewIconContainerController(state, iconContainer){

  //public api -----------------------------------------------------------------

  return {
    updateBorder: function(isOpen){
      if (isOpen){
        iconContainer.hasBorder = false;
      } else {
        iconContainer.hasBorder = true;
      }
    },
  }
}
