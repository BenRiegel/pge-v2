export default function NewContainerController(state, container){

  //private code block ---------------------------------------------------------

  var updateBorderRadius = function(isOpen){
    if (isOpen){
      container.setDefaultBorder();
    } else {
      container.setRoundedBorder();
    }
  }

  state.isOpen.addListener('container', currentValue => {
    updateBorderRadius(currentValue);
  });

};
