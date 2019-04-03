export default function SelectMenuDispatcherController(dispatcher, model, view){

  var { nodes } = view;
  var { root } = nodes;

  //define event reactions -----------------------------------------------------

  var onClick = function(selectedOptionKey){
    dispatcher.doAction('optionClick', selectedOptionKey);
  }

  //load event reactions -------------------------------------------------------

  root.setListener('click', onClick);

}
