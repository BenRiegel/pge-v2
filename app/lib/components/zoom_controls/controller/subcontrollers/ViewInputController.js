export default function ZoomControlsViewInputController(view, dispatcher){

  var { nodes } = view;
  var { root } = nodes;

  //define reactions -----------------------------------------------------------

  var onEnable = function(){
    root.isListening = true;
  }

  var onDisable = function(){
    root.isListening = false;
  }

  //load reactions -------------------------------------------------------------

  dispatcher.setListener('viewInput', 'enable', onEnable);
  dispatcher.setListener('viewInput', 'disable', onDisable);

}
