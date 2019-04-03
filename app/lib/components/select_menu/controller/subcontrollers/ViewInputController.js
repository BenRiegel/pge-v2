export default function SelectMenuViewInputController(view, dispatcher){

  var { nodes } = view;
  var { root } = nodes;

  //define reactions -----------------------------------------------------------

  var onEnable = function(){
    root.isListening = true;
  }

  var onDisable = function(){
    root.isListening = false;
  }

  var onOptionClick = function(status){
    if (status === 'start'){
      root.isListening = false;
    } else if (status === 'end'){
      root.isListening = true;
    }
  }

  //load reactions -------------------------------------------------------------

  dispatcher.setListener('viewInput', 'enable', onEnable);
  dispatcher.setListener('viewInput', 'disable', onDisable);
  dispatcher.setListener('viewInput', 'optionClick', onOptionClick);

}
