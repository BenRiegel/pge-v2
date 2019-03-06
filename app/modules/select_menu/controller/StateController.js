export default function StateController(state, view){

  //define user event reactions ------------------------------------------------

  var updateOnOptionClick = async function(optionClicked){
    state.set('selectedOptionKey', optionClicked);
    await state.set('isOpen', !state.isOpen);
  }

  //load reactions -------------------------------------------------------------

  view.emitter.private.addListener('click', updateOnOptionClick);

}
