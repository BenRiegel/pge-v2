export default function SelectMenuStateController(state, view){

  var { nodes } = view;
  var { root } = nodes;

  //define user event reactions ------------------------------------------------

  var updateOnOptionClick = function(optionClicked){
    state.set('selectedOptionKey', optionClicked);
    state.setAsync('isOpen', !state.isOpen);
  }

  //load reactions -------------------------------------------------------------

  root.onClick = updateOnOptionClick;

}
