export default function ZoomControlsDispatcherController(dispatcher, view){

  var { nodes } = view;
  var { root } = nodes;

  //define reactions -----------------------------------------------------------

  var onClick = function(buttonId){
    dispatcher.notify('emitter', 'buttonClick', buttonId);
  }

  //load reactions -------------------------------------------------------------

  root.setListener('click', onClick);

}
