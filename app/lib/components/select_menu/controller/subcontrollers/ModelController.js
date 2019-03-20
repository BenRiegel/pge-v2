export default function SelectMenuStateController(model, view){

  var { nodes } = view;
  var { root } = nodes;

  //define user event reactions ------------------------------------------------

  var updateOnOptionClick = function(optionClicked){
    model.set('selectedOptionKey', optionClicked);
    model.setAsync('isOpen', !model.isOpen);
  }

  //load reactions -------------------------------------------------------------

  root.onClick = updateOnOptionClick;

}
