//imports ----------------------------------------------------------------------

import DomElement from '../../../../lib/DomElement.js';
import '../stylesheets/graphics_layer.scss';


//exports ----------------------------------------------------------------------

export default function ContainerNode(mapViewpoint, state, eventsEmitter){

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

  mapViewpoint.addListener('graphicsLayer - fadeDown', async () => {
    await container.animateOpacity('transparent');
  });

  mapViewpoint.addListener('graphicsLayer - fadeUp', async () => {
    await container.animateOpacity('opaque');
  });


  //public api -----------------------------------------------------------------

  this.node = container.node;

  this.render = function(){
    updateListener();
  };

  this.emptyChildren = function(){
    while (container.node.firstChild) {
      container.node.removeChild(container.node.firstChild);
    }
  }

}
