export default function SelectMenuDispatcherController(dispatcher, model, view){

  var { nodes } = view;
  var { root } = nodes;

  //define reactions -----------------------------------------------------------

  var clickedOptionAction = function(selectedOptionKey){
    return dispatcher.newAsyncAction('optionClick', selectedOptionKey);
  }

  //load reactions -------------------------------------------------------------

  root.setListener('click', clickedOptionAction);

}
