//imports ----------------------------------------------------------------------

import Option from '../../select_menu_option/SelectMenuOption.js';


//exports ----------------------------------------------------------------------

export default function ViewController(state, view){

  //define state change reactions ----------------------------------------------

  var updateContainerBorderRadius = function(){
    if (state.isOpen){
      view.nodes.container.setDefaultBorderRadius();
    } else {
      view.nodes.container.setRoundedBorderRadius();
    }
  }

  var updateEventInProgress = function(updateInProgress){
    view.props.updateInProgress = updateInProgress;
  }

  var broadcastPrivate = function(...args){
    if (view.props.inputEnabled && !view.props.updateInProgress){
      view.emitter.private.broadcast('click', ...args);
    }
  }

  var broadcastPublic = function(eventInProgress){
    if (eventInProgress){
      view.emitter.public.broadcast('eventStart');
    } else {
      view.emitter.public.broadcast('eventEnd');
      if (state.props.selectedOptionKey.hasChanged){
        view.emitter.public.broadcast('newSelectedOption', state.selectedOptionKey);
      }
    }
  }

  //load reactions -------------------------------------------------------------

  state.addListenerByType('isOpen', 'menuContainerBorderRadius', updateContainerBorderRadius);
  state.addListenerByType('isOpen', 'eventInProgress', updateEventInProgress);
  state.addListenerByType('isOpen', 'eventInProgress', broadcastPublic)
  view.nodes.container.setEventListener('click', broadcastPrivate);

  //init -----------------------------------------------------------------------

  updateContainerBorderRadius();

  //public api -----------------------------------------------------------------

  this.addNewOption = function(optionProps){
    var option = new Option(optionProps, state);
    view.subcomponents[optionProps.key] = option;
    view.nodes.container.node.appendChild(option.rootNode);
  }

}
