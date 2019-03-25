export default function ZoomControlsDispatcherController(dispatcher, view){

  var { nodes } = view;
  var { root } = nodes;

  //define reactions -----------------------------------------------------------

  var buttonClickAction = function(buttonId){
    dispatcher.newAction('buttonClick', buttonId);
  }

  //load reactions -------------------------------------------------------------

  root.setListener('click', buttonClickAction);

}
