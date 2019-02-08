//imports ----------------------------------------------------------------------

import DomElement from '../../../../lib/DomElement.js';
import '../stylesheets/basemap_layer.scss';


//exports ----------------------------------------------------------------------

export default function ContainerNode(mapViewpoint, state, eventsEmitter){

  //helper variables and functions ---------------------------------------------

  var initialCoords = {x:null, y:null};

  var mouseMoveEventHandler = function(evt){
    evt.preventDefault();
    var deltaX = evt.clientX - initialCoords.x;
    var deltaY = evt.clientY - initialCoords.y;
    initialCoords.x = evt.clientX;
    initialCoords.y = evt.clientY;
    //negate so that pan to the right shifts viewpoint left
    eventsEmitter.broadcast('userPanRequest', {x:-deltaX, y:-deltaY});
  }

  //create dom element ---------------------------------------------------------

  var container = new DomElement('div', 'basemap-layer');

  container.setEventListener('mousedown', evt => {
    evt.preventDefault();
    container.setStyle('cursor', 'move');
    initialCoords.x = evt.clientX;
    initialCoords.y = evt.clientY;
    container.addEventListener('mousemove', mouseMoveEventHandler);
    eventsEmitter.broadcast('userPanStartRequest');
  });

  container.setEventListener('mouseup', () => {
    container.setStyle('cursor', 'default');
    container.removeEventListener('mousemove', mouseMoveEventHandler);
    eventsEmitter.broadcast('userPanEndRequest');
  });

  /*container.setEventListener('mouseout', evt => {
    //evt.preventDefault();
    console.log(evt);
    container.setStyle('cursor', 'default');
    container.removeEventListener('mousemove', mouseMoveEventHandler);
    eventsEmitter.broadcast('userPanEndRequest');
  });*/


  //define state change reactions ----------------------------------------------

  var updateListener = function(){
    if (state.isEnabled){
      container.enableListeners();
    } else {
      container.disableListeners();
    }
  }

  //load reactions -------------------------------------------------------------

  state.addListener('isEnabled', 'basemapLayerContainer', 'listener', updateListener);

  mapViewpoint.addListener('basemapLayer - fadeDown', async () => {
    await container.animateOpacity('transparent');
  });

  mapViewpoint.addListener('basemapLayer - fadeUp', async () => {
    await container.animateOpacity('opaque');
  });

  //public api -----------------------------------------------------------------

  this.node = container.node;

  this.render = function(){
    updateListener();
  };

}
