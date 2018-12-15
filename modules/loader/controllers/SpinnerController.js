export default function NewSpinnerController(state, spinnerView){

  //private code block ---------------------------------------------------------

  var updateVisibility = function(isVisible){
    if (isVisible){
      spinnerView.show();
    } else {
      spinnerView.hide();
    }
  }

  state.isVisible.addListener('spinner', currentValue => {
    updateVisibility(currentValue);
  });

};
