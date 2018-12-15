export default function NewOptionLabelController(state, labelContainer, labelType){

  //public api -----------------------------------------------------------------

  return {
    updateIndent: function(isOpen){
      if (labelType === 'secondary'){
        if (isOpen){
          labelContainer.indentIsActive = true;
        } else {
          labelContainer.indentIsActive = false;
        }
      }
    },
  }

}
