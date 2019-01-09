//imports ----------------------------------------------------------------------

import DomElement from '../../../../lib/DomElement.js';


//exports ----------------------------------------------------------------------

export default function ContainerNode(state, eventsEmitter){

  //create dom element ---------------------------------------------------------

  var container = new DomElement('div', 'graphics-layer');

  container.setEventListener('click', evt => {
    var graphicId = Number(evt.target.dataset.id);
    var graphicType = evt.target.dataset.type;
    var worldCoords = {
      x: Number(evt.target.dataset.x),
      y: Number(evt.target.dataset.y)
    };
    eventsEmitter.broadcast(graphicType, graphicId, worldCoords);
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

  state.addListener('isEnabled', 'graphicsLayerContainer', 'listener', updateListener);

  //public api -----------------------------------------------------------------

  this.node = container.node;

  this.render = function(){
    updateListener();
  };

}
