export default function StateController(state, view){

  var { nodes } = view;
  var { container } = nodes;

  //define user event reactions ------------------------------------------------

  var updateOnOptionClick = async function(optionClicked){
    if (!state.eventInProgress && !state.userDisabled){
      state.set('eventInProgress', true);
      state.set('selectedOptionKey', optionClicked);
      await state.set('isOpen', !state.isOpen);
      state.set('eventInProgress', false);
    }
  }

  //load reactions -------------------------------------------------------------

  container.emitter.addListener('click', updateOnOptionClick);

}
