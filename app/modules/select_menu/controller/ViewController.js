//imports ----------------------------------------------------------------------

import Option from '../../select_menu_option/SelectMenuOption.js';


//exports ----------------------------------------------------------------------

export default function SelectMenuViewController(view, state){

  var { nodes } = view;
  var { root } = nodes;

  //define state change reactions ----------------------------------------------

  var updateRootBorderRadius = function(){
    if (state.isOpen){
      root.setBorderRadius('default');
    } else {
      root.setBorderRadius('rounded');
    }
  }

  var updateDomListener = function(isListening){
    root.isListening = isListening;
  }

  //load reactions -------------------------------------------------------------

  state.addListenerByType('isOpen', 'menuRootBorderRadius', updateRootBorderRadius);

  //init -----------------------------------------------------------------------

  updateRootBorderRadius();
  updateDomListener(true);

  //public api -----------------------------------------------------------------

  this.updateDomListener = updateDomListener;

  this.addNewOption = function(optionProps){
    var option = new Option(optionProps, state);
    root.appendChildNode(option.rootNode);
  }

}
