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
      y: Number(evt.target.dataset.y),
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

  state.addListener('isEnabled', updateListener);

  mapViewpoint.addListener('zoomHomeStart', async () => {
    await container.animateOpacity('transparent');
  });

  mapViewpoint.addListener('zoomHomeEnd', async () => {
    await container.animateOpacity('opaque');
  });

  //init dom element -----------------------------------------------------------

  updateListener();

  //public api -----------------------------------------------------------------

  return container;

}
