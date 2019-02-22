//imports ----------------------------------------------------------------------

import DomElement from '../../../../lib/DomElement.js';
import '../stylesheets/select_menu.scss';


//module code block ------------------------------------------------------------

export function getParentNodeProperty(node, className, prop){
  while (node){
    if (node.classList && node.classList.contains(className)){
      return node.dataset[prop];
    }
    node = node.parentNode;
  }
  return null;
};


//exports ----------------------------------------------------------------------

export default function ContainerNode(state){

  //create dom element ---------------------------------------------------------

  var container = new DomElement('div', 'select-menu-container');

  container.setRoundedBorderRadius = function(){
    this.addClass('rounded');
  };

  container.setDefaultBorderRadius = function(){
    this.removeClass('rounded');
  };

  container.setEventListener('click', function(evt){
    var optionClicked = getParentNodeProperty(evt.target, 'option', 'key');
    if (optionClicked){
      state.updateOnOptionClick(optionClicked);
    }
  });

  //define state change reactions ----------------------------------------------

  var updateBorderRadius = function(){
    if (state.isOpen){
      container.setDefaultBorderRadius();
    } else {
      container.setRoundedBorderRadius();
    }
  };

  var updateListener = function(){
    if (state.isEnabled && !state.eventInProgress){
      container.enableListeners();
    } else {
      container.disableListeners();
    }
  }

  //load reactions -------------------------------------------------------------

  state.addListener('isOpen', 'menuContainer', 'borderRadius', updateBorderRadius);
  state.addListener('eventInProgress', 'menuContainer', 'listener', updateListener);
  state.addListener('isEnabled', 'menuContainer', 'listener', updateListener);

  //init dom element -----------------------------------------------------------

  updateBorderRadius();
  updateListener();

  //public api -----------------------------------------------------------------

  this.node = container.node;

};
