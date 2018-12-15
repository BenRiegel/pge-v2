export default function NewBackgroundController(state, backgroundView){

  //private code block ---------------------------------------------------------

  var updateVisibility = async function(isVisible){
    if (isVisible){
      backgroundView.setOpaque();
      backgroundView.show();
    } else {
      if (state.fadeOut === true){
        await backgroundView.fadeOut();
      }
      backgroundView.hide();
    }
  }

  state.isVisible.addListener('background', async currentValue => {
    await updateVisibility(currentValue);
  });

};
