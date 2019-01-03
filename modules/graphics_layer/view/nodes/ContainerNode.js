//imports ----------------------------------------------------------------------

import DomElement from '../../../../lib/DomElement.js';


//exports ----------------------------------------------------------------------

export default function ContainerNode(state, eventsEmitter){

  //private code block ---------------------------------------------------------

  var container = new DomElement('div', 'graphics-layer');

  container.setEventListener('click', evt => {
    var graphicId = evt.target.dataset.id;
    eventsEmitter.onGraphicClick(graphicId);
  });

  //define state change reactions ----------------------------------------------

  var updateListener = function(){
    if (state.isEnabled){
      container.enableListeners();
    } else {
      container.disableListeners();
    }
  }

  //load reactions -------------------------------------------------------------

  state.addListener('isEnabled', 'menuContainer', 'listener', updateListener);

  //public api -----------------------------------------------------------------

  this.node = container.node;

  this.render = function(){
    updateListener();
  };

}
